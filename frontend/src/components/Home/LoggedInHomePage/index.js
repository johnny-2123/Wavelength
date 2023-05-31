import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, NavLink } from "react-router-dom";
import { fetchFriends, updateOnlineStatus, updateOfflineStatus } from "../../../store/friends";
import DirectMessageForm from "../../DirectMessageForm";
import { fetchSetCurrentUserOffline } from "../../../store/session";
import { fetchGameById } from "../../../store/game";
import { fetchCreateRound } from "../../../store/rounds";
import FriendsList from "../../Friends";
import GameInviteRequestComponent from "../../GameInviteRequestComponent";
import GamePlay from "../../GamePlay";
import useWebSocket from "./useWebsocket";
import { useModal } from "../../../context/modal";
import './LoggedInHomePage.css'

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setModalContent, closeModal } = useModal();
    const { friends } = useSelector((state) => state?.friends);

    const [receivedMessages, setReceivedMessages] = useState([]);
    const [acceptedFriendsUserNamesArray, setAcceptedFriendsUserNamesArray] = useState([]);
    const [shouldConnect, setShouldConnect] = useState(false);

    const game = useSelector((state) => state?.games?.currentGame)
    console.log('game in home component', game)

    const [showGamePlay, setShowGamePlay] = useState(game?.id !== undefined && !game?.gameOver);

    console.log('showGamePlay', showGamePlay)



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

    const messageHandlers = {
        "direct-message": (data) => setReceivedMessages((prev) => [...prev, data]),
        "friend-online": (data) => handleFriendStatusChange(data, 'online'),
        "friend-offline": (data) => handleFriendStatusChange(data, 'offline'),
        "game-invite": (data) => {
            setModalContent(<GameInviteRequestComponent sender={data?.sender} sendMessage={sendMessage} user1Id={data?.user1Id} user2Id={data?.user2Id} sessionUser={sessionUser} closeModal={closeModal} />);
        },
        "start-game": (data) => {
            const newGameId = data?.newGameId;
            dispatch(fetchGameById(newGameId)).then((game) => {
                setShowGamePlay(true);
                history.push(`/gameplay/${game?.id}`);
            }).catch((error) => {
                console.log('error fetching game', error);
            });
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

    const { sendMessage } = useWebSocket(generateWebSocketURL(), messageHandlers, shouldConnect);

    useEffect(() => {
        if (game.id !== undefined && !game?.gameOver) {
            console.log('game not over home component')
            setShowGamePlay(true);
            history.push(`/gameplay/${game?.id}`);
        } else {
            console.log('game is over home component')
            setShowGamePlay(false);
            history.push('/');
        }
    }, [game])


    // Fetch friends when the component mounts
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
        };
    }, [dispatch, sessionUser?.id]);

    return (
        <div className="homePageLoggedInMainDiv">
            {!showGamePlay && <nav className="NavBar">
                <NavLink to="/direct-message-form" activeClassName="active-link" exact>
                    Direct Message Form
                </NavLink>
                <NavLink to="/friends-list" activeClassName="active-link" exact>
                    Friends List
                </NavLink>
            </nav>}
            <Switch>
                <Route path="/gameplay/:gameId">
                    <GamePlay sessionUser={sessionUser} sendMessage={sendMessage} setShowGamePlay={setShowGamePlay} />
                </Route>
                <Route path="/direct-message-form">
                    <DirectMessageForm sendMessage={sendMessage} sessionUser={sessionUser} receivedMessages={receivedMessages} />
                </Route>
                <Route path="/friends-list">
                    <FriendsList friends={friends} sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
            </Switch>
        </div >
    );
};

export default LoggedInUserHomePage;
