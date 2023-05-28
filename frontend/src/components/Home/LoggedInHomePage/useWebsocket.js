import { useEffect, useRef } from "react";

const useWebSocket = (url, onMessage) => {
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

        connect();

        return () => {
            if (websocket.current) {
                websocket.current.close();
            }
        };
    }, [url]);

    const sendMessage = (type, data) => {
        if (websocket.current?.readyState === WebSocket.OPEN) {
            const message = { type, data };
            websocket.current.send(JSON.stringify(message));
        }
    };

    return { sendMessage };
};

export default useWebSocket;
