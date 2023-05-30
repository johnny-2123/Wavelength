import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSetCurrentUserOffline, fetchSetCurrentUserOnline } from "../../../store/session";

const useWebSocket = (url, onMessage, dependency) => {
    const websocket = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const connect = () => {
            const ws = new WebSocket(url);
            // dispatch(fetchSetCurrentUserOnline());

            ws.onmessage = (event) => {
                onMessage(JSON.parse(event.data));
            };

            ws.onclose = () => {
                setTimeout(connect, 1000);
                dispatch(fetchSetCurrentUserOffline());
            };

            websocket.current = ws;
        };

        if (dependency) {
            connect();
        }

        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, [dependency, url]);

    const sendMessage = (type, data) => {
        if (websocket.current?.readyState === WebSocket.OPEN) {
            const message = { type, data };
            websocket.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage };
};

export default useWebSocket;
