import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import { fetchFriends, updateOnlineStatus, updateOfflineStatus } from "../../../store/friends";
import DirectMessageForm from "../../DirectMessageForm";
import { fetchSetCurrentUserOffline, fetchSetCurrentUserOnline } from "../../../store/session";
import { fetchGames, fetchGameById } from "../../../store/game";
import FriendsList from "../../Friends";
import GameInviteRequestComponent from "../../GameInviteRequestComponent";
import GamePlay from "../../GamePlay";
import "./LoggedInHomePage.css";
import useWebSocket from "./useWebsocket";
import { useModal } from "../../../context/modal";

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [acceptedFriendsUserNamesArray, setAcceptedFriendsUserNamesArray] = useState([]);
    const [shouldConnect, setShouldConnect] = useState(false);
    const [showGamePlay, setShowGamePlay] = useState(false)

    const { setModalContent, closeModal } = useModal();

    const { friends } = useSelector((state) => state?.friends);

    const handleFriendStatusChange = (data, statusType) => {
        let username = data.username;
        let friendId;
        friends.forEach((friend) => {
            if (friend?.RequestingUser?.username === username) {
                friendId = friend?.RequestingUser?.id;
            } else if (friend?.ReceivingUser?.username === username) {
                friendId = friend?.ReceivingUser?.id;
            }
        });
        if (statusType === 'online') {
            dispatch(updateOnlineStatus(sessionUser?.id, friendId));
        }
        if (statusType === 'offline') {
            dispatch(updateOfflineStatus(sessionUser?.id, friendId));
        }
    };

    const onWebSocketMessage = (message) => {
        const { type, data } = message;
        switch (type) {
            case "direct-message":
                setReceivedMessages((prev) => [...prev, data]);
                break;
            case "friend-online":
                handleFriendStatusChange(data, 'online');
                break;
            case "friend-offline":
                handleFriendStatusChange(data, 'offline');
                break;
            case "game-invite":
                console.log('received game invite');
                const sender = data?.sender;
                const user1Id = data?.user1Id;
                const user2Id = data?.user2Id;
                console.log(`user1Id: ${user1Id}`);
                console.log(`user2Id: ${user2Id}`);
                console.log(`data request data`, data);
                console.log(`game invite sender: ${sender}`);
                setModalContent(<GameInviteRequestComponent sender={sender} sendMessage={sendMessage} user1Id={user1Id} user2Id={user2Id} sessionUser={sessionUser} closeModal={closeModal} />);
                break;
            case "start-game":
                console.log('received start game message');
                const newGameId = data?.newGameId;
                console.log('newGameId', newGameId)
                const user1 = data?.user1;
                console.log('user1', user1)
                const user2 = data?.user2;
                console.log('user2', user2)
                dispatch(fetchGameById(newGameId)).then((game) => {
                    console.log('game', game)

                }).catch((error) => {
                    console.log('error fetching game', error)
                })
                setShowGamePlay(true)
                break
            default:
                console.log("Unknown websocket message type:", type);
        }
    };

    const generateWebSocketURL = () => {
        const encodedFriends = encodeURIComponent(JSON.stringify(acceptedFriendsUserNamesArray));
        const baseWebSocketURL =
            process.env.NODE_ENV === "production"
                ? "wss://wavelength-2hp9.onrender.com"
                : process.env.REACT_APP_WS_URL;

        return `${baseWebSocketURL}?username=${sessionUser?.username}&friends=${encodedFriends}`;
    };

    const { sendMessage } = useWebSocket(generateWebSocketURL(), onWebSocketMessage, shouldConnect);

    useEffect(() => {
        dispatch(fetchFriends()).then((fetchedFriends) => {
            const acceptedFriendsUserNames = fetchedFriends
                ?.filter((friend) => friend.status === "accepted")
                ?.map((friend) =>
                    friend?.userId === sessionUser?.id ? friend?.ReceivingUser?.username : friend?.RequestingUser?.username
                );
            setAcceptedFriendsUserNamesArray(acceptedFriendsUserNames);
            setShouldConnect(true);
        }).catch((error) => {
            console.log("An error occurred while fetching friends:", error);
        });

        return () => {
            dispatch(fetchSetCurrentUserOffline());
        }
    }, [dispatch, sessionUser?.id]);

    return (
        <div className="homePageLoggedInMainDiv">
            {showGamePlay && <GamePlay />}
            {!showGamePlay &&
                <>
                    <h1>Welcome User</h1>
                    <nav className="NavBar">
                        <NavLink to="/direct-message-form" activeClassName="active-link" exact>
                            Direct Message Form
                        </NavLink>
                        <NavLink to="/friends-list" activeClassName="active-link" exact>
                            Friends List
                        </NavLink>
                    </nav>

                    <Switch>
                        <Route path="/direct-message-form">
                            <DirectMessageForm sendMessage={sendMessage} sessionUser={sessionUser} receivedMessages={receivedMessages} />
                        </Route>
                        <Route path="/friends-list">
                            <FriendsList friends={friends} sessionUser={sessionUser} sendMessage={sendMessage} />
                        </Route>
                    </Switch>
                </>
            }
        </div >
    );
};

export default LoggedInUserHomePage;
