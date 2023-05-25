import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import "./LoggedInHomePage.css";

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();

    const websocket = useRef(null);

    const sendMessage = (type, data) => {
        const message = {
            type,
            data,
        };
        console.log('websocket.current: ', websocket.current);
        if (type === 'message' && (!websocket.current || !websocket.current.hasJoinedRoom)) {
            // Add the 'join' message before the first 'message' message
            const { username, id } = sessionUser; // Modify this to get the correct username and room
            const room = id;
            console.log('username: ', username);
            console.log('room: ', room);
            const joinMessage = {
                type: 'join',
                data: { username, room },
            };
            if (websocket.current && websocket.current.ws.readyState === WebSocket.OPEN) {
                websocket.current.ws.send(JSON.stringify(joinMessage));
                websocket.current.hasJoinedRoom = true;
            } else {
                console.log('WebSocket connection is not open.');
            }
        }

        console.log('websocket message sent: ', message);
        if (websocket.current && websocket.current.ws.readyState === WebSocket.OPEN) {
            websocket.current.ws.send(JSON.stringify(message));
        } else {
            console.log('WebSocket connection is not open.');
        }
    };

    const connect = () => {
        let ws;

        if (process.env.NODE_ENV === 'production') {
            ws = new WebSocket("wss://wavelength-2hp9.onrender.com");
        } else {
            ws = new WebSocket(process.env.REACT_APP_WS_URL);
        }

        ws.onopen = () => {
            console.log('websocket opened');
        };

        ws.onmessage = (e) => {
            console.log('websocket message received: ', e);

            const message = JSON.parse(e.data);
            console.log('websocket message parsed: ', message);
        };

        ws.onerror = (e) => {
            console.log('websocket error: ', e);
        };

        ws.onclose = (e) => {
            console.log('websocket closed: ', e);
            websocket.current = null;
            // Attempt to reconnect after 1 second
            setTimeout(connect, 1000);
        };

        websocket.current = {
            ws,
            sendMessage,
        };
    };

    useEffect(() => {
        // Connect on component mount
        connect();

        return function cleanup() {
            if (websocket.current && websocket.current.ws.readyState === WebSocket.OPEN) {
                websocket.current.ws.close();
            }
        };
    }, [sessionUser]);


    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (websocket.current && websocket.current.ws.readyState === WebSocket.OPEN) {
            const data = {
                message,
                username: sessionUser.username,
            };
            sendMessage('message', data);
            setMessage('');
        } else {
            console.log('WebSocket connection is not open.');
        }
    };

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
                <button
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default LoggedInUserHomePage;
