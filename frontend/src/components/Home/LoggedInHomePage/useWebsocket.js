import { useEffect, useRef } from "react";

const useWebSocket = (url, onMessage, dependency) => {
    const websocket = useRef(null);

    useEffect(() => {
        const connect = () => {
            const ws = new WebSocket(url);

            ws.onmessage = (event) => {
                onMessage(JSON.parse(event.data));
            };

            ws.onclose = () => {
                setTimeout(connect, 1000);
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
