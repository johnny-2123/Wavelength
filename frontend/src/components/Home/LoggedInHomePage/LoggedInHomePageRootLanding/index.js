import React from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import { updateGame } from "../../../../store/game";
import './LoggedInHomePageRootLanding.css'

const LoggedInHomePageRootLanding = ({ game, sessionUser, sendMessage, friends }) => {
    const dispatch = useDispatch();
    const friendUser =
        game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;

    const handleEndGame = () => {
        dispatch(updateGame(game?.id, true)).then((updatedGame) => {
            sendMessage("send-game-over-message", {
                gameId: updatedGame?.id,
                user1: updatedGame?.user1?.username,
                user2: updatedGame?.user2?.username,
            });
        });
    };

    return (
        <div className="loggedInHomePageRootLandingDiv">
            <h1>Landing Page</h1>
            <div className="previousOrCurrentGameDiv">
                {game?.gameOver === false && (
                    <div>
                        <h2>In Progress game with {friendUser.username}</h2>
                        <div>
                            <NavLink to={`/gameplay/${game?.id}`}> Resume Game </NavLink>
                            <button
                                onClick={handleEndGame}
                            > End Game
                            </button>
                        </div>
                    </div>
                )}

                {game?.gameOver === true && (
                    <h2>Last Played Game</h2>

                )}
            </div>
        </div>
    )
}

export default LoggedInHomePageRootLanding;
