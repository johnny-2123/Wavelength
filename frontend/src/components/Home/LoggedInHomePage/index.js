import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { fetchFriends } from "../../../store/friends";
import { fetchSetCurrentUserOffline } from "../../../store/session";
import { fetchGameById } from "../../../store/game";
import GameInviteRequestComponent from "../../GameInviteRequestComponent";
import Routes from "./Routes";
import GameResults from "../../GameResults";
import useWebSocket from "./useWebsocket";
import { useModal } from "../../../context/modal";
import { generateWebSocketURL, handleFriendStatusChange } from "./utils";
import './LoggedInHomePage.css';

const LoggedInUserHomePage = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setModalContent, closeModal } = useModal();
    const { friends } = useSelector((state) => state?.friends);

    const [receivedMessages, setReceivedMessages] = useState([]);
    const [acceptedFriendsUserNamesArray, setAcceptedFriendsUserNamesArray] = useState([]);
    const [shouldConnect, setShouldConnect] = useState(false);

    const game = useSelector((state) => state?.games?.currentGame);

    console.log('rerender home page', game)

    const [showGamePlay, setShowGamePlay] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [showRoundResults, setShowRoundResults] = useState(false);

    const messageHandlers = {
        "direct-message": (data) => setReceivedMessages((prev) => [...prev, data]),
        "friend-online": (data) => handleFriendStatusChange(dispatch, sessionUser, friends, data, 'online'),
        "friend-offline": (data) => handleFriendStatusChange(dispatch, sessionUser, friends, data, 'offline'),
        "game-invite": (data) => {
            setModalContent(<GameInviteRequestComponent sender={data?.sender} sendMessage={sendMessage} user1Id={data?.user1Id} user2Id={data?.user2Id} sessionUser={sessionUser} closeModal={closeModal} />);
        },
        "start-game": (data) => {
            const newGameId = data?.newGameId;
            dispatch(fetchGameById(newGameId))
                .then((game) => {
                    setShowGamePlay(true);
                    history.push(`/gameplay/${game?.id}`);
                })
                .catch((error) => {
                    console.log('error fetching game', error);
                });
        },
        "game-won": (data) => {
            const gameId = data?.gameId;
            dispatch(fetchGameById(gameId))
                .then((game) => {
                    console.log('game won', game)
                    setShowGamePlay(false)
                    setShowRoundResults(false)
                    setModalContent(<GameResults gameId={gameId} sessionUser={sessionUser} sendMessage={sendMessage} />);
                })
        },
        "round-results": (data) => {
            const gameId = data?.gameId;
            dispatch(fetchGameById(gameId))
                .then((game) => {
                    console.log('game results', game)
                    setShowGamePlay(true);
                    setShowRoundResults(true);
                    setPlayerReady(false);
                })

        },
        "start-new-round": (data) => {
            const gameId = data?.gameId;
            dispatch(fetchGameById(gameId))
                .then((game) => {
                    console.log('game results', game)
                    setShowGamePlay(true);
                    setShowRoundResults(false);
                    setPlayerReady(false);
                }
                )
        },
    };

    const { sendMessage } = useWebSocket(
        generateWebSocketURL(sessionUser, acceptedFriendsUserNamesArray),
        messageHandlers,
        shouldConnect
    );

    useEffect(() => {
        if (game?.id !== undefined && !game?.gameOver) {
            setShowGamePlay(true);
            history.push(`/gameplay/${game?.id}`);
        } else {
            setShowGamePlay(false);
            history.push('/');
        }
    }, [game, history]);

    useEffect(() => {
        dispatch(fetchFriends())
            .then((fetchedFriends) => {
                const acceptedFriendsUserNames = fetchedFriends
                    ?.filter((friend) => friend.status === "accepted")
                    ?.map((friend) =>
                        friend?.userId === sessionUser?.id ? friend?.ReceivingUser?.username : friend?.RequestingUser?.username
                    );
                setAcceptedFriendsUserNamesArray(acceptedFriendsUserNames);
                setShouldConnect(true);
            })
            .catch((error) => {
                console.log("An error occurred while fetching friends:", error);
            });

        return () => {
            // dispatch(fetchSetCurrentUserOffline());
        };
    }, [dispatch, sessionUser]);

    return (
        <div className="homePageLoggedInMainDiv">
            {!showGamePlay && (
                <nav className="homeNavBar">
                    <NavLink to="/direct-message-form" activeClassName="active-link" exact>
                        Direct Messages
                    </NavLink>
                    <NavLink to="/friends-list" activeClassName="active-link" exact>
                        Friends List
                    </NavLink>
                </nav>
            )}
            <Routes
                sessionUser={sessionUser}
                sendMessage={sendMessage}
                receivedMessages={receivedMessages}
                friends={friends}
                game={game}
                showRoundResults={showRoundResults}
                setShowRoundResults={setShowRoundResults}
                playerReady={playerReady}
                setPlayerReady={setPlayerReady}
                setShowGamePlay={setShowGamePlay}
            />
        </div>
    );
};

export default LoggedInUserHomePage;
