import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById, updateGame } from "../../store/game";
import { fetchCreateWord } from "../../store/words";

const GamePlay = ({ setShowGamePlay, sessionUser, sendMessage }) => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const game = useSelector((state) => state?.games?.currentGame);

    const [wordText, setWordText] = useState("");
    const [submittedWord, setSubmittedWord] = useState(false);

    const roundNumber = game?.Round?.length;
    const round = game?.Round?.[roundNumber - 1];
    const roundId = round?.id;

    const handleGameStatus = useCallback((game) => {
        if (
            game?.Round?.[roundNumber - 1]?.Words?.length === 2 &&
            game?.Round?.[roundNumber - 1]?.Words?.[0]?.wordText ===
            game?.Round?.[roundNumber - 1]?.Words?.[1]?.wordText
        ) {

            dispatch(updateGame(gameId, true)).then((updatedGame) => {
                console.log('updated game', updatedGame)
                console.log('updatedGame?.User1?.username', updatedGame?.user1?.username)
                console.log('updatedGame?.User2?.username', updatedGame?.user2?.username)
                sendMessage('send-game-won-message', {
                    gameId: updatedGame?.id,
                    user1: updatedGame?.user1?.username,
                    user2: updatedGame?.user2?.username,
                });
                // setShowGamePlay(false);
            });
        }
    }, [dispatch, gameId, roundNumber, setShowGamePlay]);

    useEffect(() => {
        dispatch(fetchGameById(gameId))
            .then(handleGameStatus)
            .catch((error) => {
                console.log('error fetching game', error);
            });
    }, [dispatch, gameId, handleGameStatus, submittedWord]);

    useEffect(() => {
        setShowGamePlay(!game?.gameOver);
    }, [game, setShowGamePlay]);

    const handleSubmitWord = (e) => {
        e.preventDefault();
        dispatch(fetchCreateWord(roundId, wordText))
            .then(() => setSubmittedWord(true))
            .catch((error) => console.log('error creating word', error));
    };

    return (
        <>
            <h1>Round {roundNumber}</h1>
            {!submittedWord && roundNumber <= 1 && (
                <div>
                    <div>
                        <h2>
                            Enter any word, and in the next round, you and your game partner will try to read each other's minds and enter the same word using your previous words.
                        </h2>
                    </div>
                    <div>
                        <form>
                            <input
                                type="text"
                                value={wordText}
                                onChange={(e) => setWordText(e.target.value)}
                                placeholder="Enter your word"
                            />
                            <button type="submit" onClick={handleSubmitWord}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {roundNumber > 1 && (
                <div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </>
    );
};

export default GamePlay;
