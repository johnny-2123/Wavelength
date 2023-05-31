import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById } from "../../store/game";
import './GameResults.css'

const GameResults = ({ gameId, sessionUser }) => {
    const dispatch = useDispatch();
    const game = useSelector((state) => state?.games?.currentGame);

    const friendUser = game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;

    const gameWon =
        game?.Round?.[game?.Round?.length - 1]?.Words?.[0]?.wordText ===
        game?.Round?.[game?.Round?.length - 1]?.Words?.[1]?.wordText;

    useEffect(() => {
        dispatch(fetchGameById(gameId));
    }, [dispatch, gameId]);

    return (
        <div className="gameResults">
            <h1>Game Results</h1>
            <div>
                <h2>Partner: {friendUser.username}</h2>
            </div>
            <div className="gameResultHighlights">
                <h2>Total Rounds: {game?.Round?.length}</h2>
                {gameWon && (
                    <h2>Winning Word: {game?.Round?.[game?.Round?.length - 1]?.Words?.[0]?.wordText}</h2>
                )}
            </div>
            <div className="gameResultButtons">
                <button>Play Again</button>
                <button>See Game Details</button>
            </div>
        </div>
    );
};

export default GameResults;
