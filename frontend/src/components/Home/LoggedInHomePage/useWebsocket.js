import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSetCurrentUserOffline, fetchSetCurrentUserOnline } from "../../../store/session";

const useWebSocket = (url, messageHandlers, dependency) => {
    const websocket = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let ws = null;
        if (dependency) {
            ws = new WebSocket(url);
            ws.onmessage = event => {
                const { type, data } = JSON.parse(event.data);
                const handler = messageHandlers[type];
                if (handler) {
                    handler(data);
                }
            };
            ws.onclose = () => {
                // dispatch(fetchSetCurrentUserOffline());
            };
            websocket.current = ws;
        }

        return () => {
            if (ws) ws.close();
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
