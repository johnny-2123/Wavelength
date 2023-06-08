import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { updateGame, fetchSingleMostRecentGame } from "../../../../store/game";
import './LoggedInHomePageRootLanding.css'

const LoggedInHomePageRootLanding = ({ game, sessionUser, sendMessage, friends }) => {
    const dispatch = useDispatch();

    const mostRecentGame = useSelector((state) => state.games?.mostRecentGame);
    console.log("mostRecentGame: ", mostRecentGame);
    const mostRecentGameFinalRound = mostRecentGame?.Round?.[mostRecentGame?.Round?.length - 1];
    const mostRecentGameFinalRoundWords = mostRecentGameFinalRound?.Words;
    const mostRecentGameUserWord = mostRecentGameFinalRoundWords?.filter(word => word?.userId === sessionUser?.id)[0];
    const mostRecentGameFriendWord = mostRecentGameFinalRoundWords?.filter(word => word?.userId !== sessionUser?.id)[0];
    const friendUser =
        mostRecentGame?.user1Id === sessionUser?.id ? mostRecentGame?.user2 : mostRecentGame?.user1;

    console.log('current game: ', game)

    const friendUserCurrentGame = game?.user1Id === sessionUser?.id ? game?.user2 : game?.user1;
    console.log("friendUserCurrentGame: ", friendUserCurrentGame);

    const handleEndGame = () => {
        dispatch(updateGame(game?.id, true)).then((updatedGame) => {
            sendMessage("send-game-over-message", {
                gameId: updatedGame?.id,
                user1: updatedGame?.user1?.username,
                user2: updatedGame?.user2?.username,
            });
        });
    };

    useEffect(() => {
        dispatch(fetchSingleMostRecentGame(sessionUser?.id))
            .then((game) => {
                console.log("game fetched in LoggedInHomePageRootLanding: ", game);
            })
            .catch((err) => {
                console.log("error in LoggedInHomePageRootLanding: ", err);
            });
    }, [dispatch, sessionUser?.id]);


    return (
        <div className="loggedInHomePageRootLandingDiv">
            <div className="previousOrCurrentGameDiv">
                {game?.gameOver === false && (
                    <div className="currentGameDiv">
                        <h2>In Progress game with {friendUserCurrentGame?.username}</h2>
                        <div className="currentGameButtons">
                            <NavLink to={`/gameplay/${game?.id}`}> Resume Game </NavLink>
                            <button onClick={handleEndGame}>End Game</button>
                        </div>
                    </div>
                )}

                {mostRecentGame?.id && game?.gameOver !== false && (
                    <div className="mostRecentSingleGame">
                        <h2>Last Game</h2>
                        <div className="mostRecentSingleGameSubDiv">
                            <h3>
                                Partner:{" "}
                                {mostRecentGame?.user1?.username === sessionUser?.username
                                    ? mostRecentGame?.user2?.username
                                    : mostRecentGame?.user1?.username}
                            </h3>
                            <h3>Rounds: {mostRecentGame?.Round?.length}</h3>
                            <h4>Final Words</h4>
                            <div className="mostRecentGameFinalWords">
                                <div>
                                    <h5>{sessionUser?.username}</h5>
                                    <h6>{mostRecentGameUserWord?.wordText}</h6>
                                </div>
                                <div>
                                    <h5>{friendUser?.username}</h5>
                                    <h6>{mostRecentGameFriendWord?.wordText}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoggedInHomePageRootLanding;
