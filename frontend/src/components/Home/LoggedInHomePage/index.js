import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { fetchFriends } from "../../../store/friends";
import { fetchGameById, updateGame } from "../../../store/game";
import GameInviteRequestComponent from "../../GameInviteRequestComponent";
import Routes from "./Routes";
import GameResults from "../../GameResults";
import useWebSocket from "./useWebsocket";
import { useModal } from "../../../context/modal";
import { generateWebSocketURL, handleFriendStatusChange } from "./utils";
import { toast, Slide } from "react-toastify";
import "./LoggedInHomePage.css";

const LoggedInUserHomePage = ({ sessionUser }) => {
  console.log("sessionUser", sessionUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent, closeModal } = useModal();
  const { friends } = useSelector((state) => state?.friends);

  const [receivedMessages, setReceivedMessages] = useState([]);
  const [acceptedFriendsUserNamesArray, setAcceptedFriendsUserNamesArray] =
    useState([]);
  const [shouldConnect, setShouldConnect] = useState(false);

  const game = useSelector((state) => state?.games?.currentGame);

  const [showGamePlay, setShowGamePlay] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [showRoundResults, setShowRoundResults] = useState(false);

  const notifyOnGameInviteDeclined = () =>
    toast("Game Invite Declined", { hideProgressBar: true });
  const notifyUserOffline = () =>
    toast("User is offline", { hideProgressBar: true });

  const messageHandlers = {
    "direct-message": (data) => setReceivedMessages((prev) => [...prev, data]),
    "friend-online": (data) =>
      handleFriendStatusChange(dispatch, sessionUser, friends, data, "online"),
    "friend-offline": (data) =>
      handleFriendStatusChange(dispatch, sessionUser, friends, data, "offline"),
    "game-invite": (data) => {
      toast(
        <GameInviteRequestComponent
          sender={data?.sender}
          sendMessage={sendMessage}
          user1Id={data?.user1Id}
          user2Id={data?.user2Id}
          sessionUser={sessionUser}
          closeModal={toast.dismiss}
        />,
        {
          autoClose: false,
          closeOnClick: true,
        },
        { hideProgressBar: true, transition: Slide, limit: 2, autoClose: 2000 }
      );
    },
    "start-game": (data) => {
      const newGameId = data?.newGameId;
      dispatch(fetchGameById(newGameId))
        .then((game) => {
          setModalContent(null);
          closeModal();
          setShowGamePlay(true);
          history.push(`/gameplay/${game?.id}`);
        })
        .catch((error) => {});
    },
    "declined-game-invite": (data) => {
      notifyOnGameInviteDeclined();
      closeModal();
    },
    "user-not-online": (data) => {
      notifyUserOffline();
    },
    "start-new-round": (data) => {
      const gameId = data?.gameId;
      dispatch(fetchGameById(gameId)).then((game) => {
        setShowGamePlay(true);
        setShowRoundResults(false);
        setPlayerReady(false);
      });
    },
    "round-results": (data) => {
      const gameId = data?.gameId;
      dispatch(fetchGameById(gameId)).then((game) => {
        setShowGamePlay(true);
        // setShowRoundResults(true);
        setPlayerReady(false);
      });
    },
    "game-won": (data) => {
      const gameId = data?.gameId;
      dispatch(fetchGameById(gameId)).then((game) => {
        setShowGamePlay(false);
        setShowRoundResults(false);
        history.push("/");
        setModalContent(
          <GameResults
            game={game}
            sessionUser={sessionUser}
            sendMessage={sendMessage}
          />
        );
      });
    },
    "game-over": (data) => {
      const gameId = data?.gameId;
      dispatch(fetchGameById(gameId)).then((game) => {
        setShowGamePlay(false);
        setShowRoundResults(false);
        history.push("/");
        setModalContent(
          <GameResults
            game={game}
            sessionUser={sessionUser}
            sendMessage={sendMessage}
          />
        );
      });
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
      // history.push(`/`);
    }
  }, [game, history]);

  useEffect(() => {
    dispatch(fetchFriends())
      .then((fetchedFriends) => {
        const acceptedFriendsUserNames = fetchedFriends
          ?.filter((friend) => friend.status === "accepted")
          ?.map((friend) =>
            friend?.userId === sessionUser?.id
              ? friend?.ReceivingUser?.username
              : friend?.RequestingUser?.username
          );
        setAcceptedFriendsUserNamesArray(acceptedFriendsUserNames);
        setShouldConnect(true);
      })
      .catch((error) => {});

    return () => {
      // dispatch(fetchSetCurrentUserOffline());
    };
  }, [dispatch, sessionUser]);

  return (
    <div className="homePageLoggedInMainDiv">
      {!showGamePlay && (
        <nav className="homeNavBar">
          <NavLink
            to="/friends/accepted"
            activeClassName="active-link"
            isActive={(match, location) => {
              return match || location.pathname.startsWith("/friends");
            }}
          >
            Friends
          </NavLink>
          <NavLink to="/games/allGames" activeClassName="active-link">
            Games
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
