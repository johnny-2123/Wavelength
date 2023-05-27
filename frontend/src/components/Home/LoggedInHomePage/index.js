import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends } from "../../../store/friends";
import DirectMessageForm from "../../DirectMessageForm";
import FriendsList from "../../Friends";
import "./LoggedInHomePage.css";

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const websocket = useRef(null);

    const [receivedMessages, setReceivedMessages] = useState([]);

    const { friends } = useSelector((state) => state.friends.friends);

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

        // TODO: add online status to user model in db instead of using guid to track online status

        if (process.env.NODE_ENV === "production") {
            ws = new WebSocket(`wss://wavelength-2hp9.onrender.com?username=${sessionUser?.username}`);
        } else {
            ws = new WebSocket(`${process.env.REACT_APP_WS_URL}?username=${sessionUser?.username}`);
        }

        ws.onmessage = (e) => {
            const { type, data } = JSON.parse(e.data);
            console.log("websocket message type: ", type);
            console.log("websocket message data: ", data);

            switch (type) {
                case "direct-message":
                    setReceivedMessages((prev) => [...prev, data]);
                    break;
                default:
                    console.log("unknown websocket message type: ", type);
            }
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
        dispatch(fetchFriends());
    }, [dispatch]);


    useEffect(() => {
        connect();

        return () => {
            if (websocket.current?.ws && websocket.current.ws.readyState === WebSocket.OPEN) {
                websocket.current.ws.close();
            }
        };
    }, [sessionUser?.username]);

    return (
        <div className="homePageLoggedInMainDiv">
            <h1>Welcome User</h1>
            <DirectMessageForm
                sendMessage={sendMessage}
                sessionUser={sessionUser}
                receivedMessages={receivedMessages}
            />
            <FriendsList friends={friends} sessionUser={sessionUser} />
        </div>
    );
};

export default LoggedInUserHomePage;
