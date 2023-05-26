import React, { useEffect, useState, useRef, useCallback } from "react";

import "./LoggedInHomePage.css";

const LoggedInUserHomePage = ({ sessionUser }) => {
    const websocket = useRef(null);

    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]);

    const sendMessage = (type, data) => {
        if (!websocket.current?.ws || websocket.current.ws.readyState !== WebSocket.OPEN) {
            console.log("WebSocket connection is not open.");
            return;
        }

        const message = {
            type,
            data,
        };

        websocket.current.ws.send(JSON.stringify(message));
        console.log("websocket message sent: ", message);
    };

    const connect = () => {
        let ws;

        if (process.env.NODE_ENV === "production") {
            ws = new WebSocket(`wss://wavelength-2hp9.onrender.com?username=${sessionUser?.username}`);
        } else {
            ws = new WebSocket(`${process.env.REACT_APP_WS_URL}?username=${sessionUser?.username}`);
        }

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
            console.log("websocket message received: ", e);
            console.log("websocket message parsed: ", message);
        };

        ws.onclose = () => {
            websocket.current = null;
            setTimeout(connect, 1000);
        };

        websocket.current = {
            ws,
            sendMessage,
        };
    };

    useEffect(() => {
        connect();

        return () => {
            if (websocket.current?.ws && websocket.current.ws.readyState === WebSocket.OPEN) {
                websocket.current.ws.close();
            }
        };
    }, [sessionUser?.username]);

    const handleSubmitDirectMessage = useCallback(
        (e) => {
            e.preventDefault();
            sendMessage("direct-message", {
                recipient,
                message,
                username: sessionUser?.username,
            });

            setMessage("");
            setRecipient("");
        },
        [recipient, message, sessionUser?.username]
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            sendMessage("message", {
                message,
                username: sessionUser?.username,
            });

            setMessage("");
        },
        [message, sessionUser?.username]
    );

    return (
        <div className="homePageLoggedInMainDiv">
            <h1>Welcome User</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>
                    Send Message
                </button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Enter recipient's username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <button type="submit" onClick={handleSubmitDirectMessage}>
                    Send Direct Message
                </button>
            </div>
            <div>
                <h2>Received Messages</h2>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LoggedInUserHomePage;
