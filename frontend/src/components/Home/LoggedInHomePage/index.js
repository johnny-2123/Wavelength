import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriends, updateOnlineStatus } from "../../../store/friends";
import DirectMessageForm from "../../DirectMessageForm";
import FriendsList from "../../Friends";
import "./LoggedInHomePage.css";
import useWebSocket from "./useWebsocket";
const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [acceptedFriendsUserNamesArray, setAcceptedFriendsUserNamesArray] = useState([]);
    const { friends } = useSelector((state) => state?.friends);

    const onWebSocketMessage = (message) => {
        const { type, data } = message;
        switch (type) {
            case "direct-message":
                setReceivedMessages((prev) => [...prev, data]);
                break;
            case "friend-online":
                console.log('friend-online data in frontend onMessage switch: ', data);
                const { username } = data;
                let friendId;
                friends.forEach((friend) => {
                    if (friend?.RequestingUser?.username === username) {
                        console.log("friend.RequestingUser: ", friend.RequestingUser);
                        friendId = friend.RequestingUser.id;
                    } else if (friend?.ReceivingUser?.username === username) {
                        console.log("friend.ReceivingUser: ", friend.ReceivingUser);
                        friendId = friend.ReceivingUser.id;
                    }
                })
                console.log("friendId: ", friendId);
                dispatch(updateOnlineStatus(sessionUser?.id, friendId));
                console.log("friend-online: ", username);
                break;
            default:
                console.log("Unknown websocket message type:", type);
        }
    };


    const { sendMessage } = useWebSocket(
        process.env.NODE_ENV === "production"
            ? `wss://wavelength-2hp9.onrender.com?username=${sessionUser?.username}&friends=${encodeURIComponent(
                JSON.stringify(acceptedFriendsUserNamesArray)
            )}`
            : `${process.env.REACT_APP_WS_URL}?username=${sessionUser?.username}&friends=${encodeURIComponent(
                JSON.stringify(acceptedFriendsUserNamesArray)
            )}`,
        onWebSocketMessage,
        acceptedFriendsUserNamesArray
    );

    useEffect(() => {
        dispatch(fetchFriends()).then(() => {
            const acceptedFriendsUserNames = friends
                ?.filter((friend) => friend.status === "accepted")
                ?.map((friend) =>
                    friend?.userId === sessionUser?.id ? friend?.ReceivingUser?.username : friend?.RequestingUser?.username
                );

            setAcceptedFriendsUserNamesArray(acceptedFriendsUserNames);
        });
    }, [dispatch, sessionUser?.id]);

    return (
        <div className="homePageLoggedInMainDiv">
            <h1>Welcome User</h1>
            <DirectMessageForm sendMessage={sendMessage} sessionUser={sessionUser} receivedMessages={receivedMessages} />
            <FriendsList friends={friends} sessionUser={sessionUser} sendMessage={sendMessage} />
        </div>
    );
};

export default LoggedInUserHomePage;
