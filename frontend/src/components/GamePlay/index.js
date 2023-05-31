import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById, updateGame } from "../../store/game";
import { fetchUpdateRound } from "../../store/rounds";
import { fetchCreateWord } from "../../store/words";
import './Gameplay.css';
const GamePlay = ({ setShowGamePlay, sessionUser, sendMessage, showRoundResults, setShowRoundResults }) => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const game = useSelector((state) => state?.games?.currentGame);

    const [wordText, setWordText] = useState("");
    const [submittedWord, setSubmittedWord] = useState(false);
    const [nextRoundReady, setNextRoundReady] = useState(false);
    console.log('show round results', showRoundResults)
    console.log('submitted word', submittedWord)
    console.log(`!submittedWord && !setShowRoundResults && roundNumber <= 1`, !submittedWord && !setShowRoundResults && roundNumber <= 1)

    const roundNumber = game?.Round?.length;
    console.log('roundNumber', roundNumber)
    const round = game?.Round?.[roundNumber - 1];
    const roundId = round?.id;
    const roundWords = round?.Words;
    const friendUser = game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;
    const friendWord = roundWords?.find((word) => word?.userId !== sessionUser?.id);
    const friendWordText = friendWord?.wordText;
    const userWord = roundWords?.find((word) => word?.userId === sessionUser?.id);
    const userWordText = userWord?.wordText;

    const handleGameStatus = useCallback((game) => {
        console.log('running handle game status')
        console.log(`user1 agrees: ${game?.Round?.[roundNumber - 1]?.user1Agrees}`)
        console.log(`user2 agrees: ${game?.Round?.[roundNumber - 1]?.user2Agrees}`)
        const user1Agrees = game?.Round?.[roundNumber - 1]?.user1Agrees;
        const user2Agrees = game?.Round?.[roundNumber - 1]?.user2Agrees;
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
            });
        } else if (game?.Round?.[roundNumber - 1]?.Words?.length === 2) {
            sendMessage('send-round-results', {
                gameId: game?.id,
                user1: game?.user1?.username,
                user2: game?.user2?.username,
            });
        } else if (game?.Round?.[roundNumber - 1]?.user1Agrees && game?.Round?.[roundNumber - 1]?.user2Agrees) {
            console.log(`user1 agrees: ${game?.Round?.[roundNumber - 1]?.user1Agrees}`)
            console.log(`user2 agrees: ${game?.Round?.[roundNumber - 1]?.user2Agrees}`)
            console.log('both users agree')
        } else if (game?.Round?.[roundNumber - 1]?.user1Agrees || game?.Round?.[roundNumber - 1]?.user2Agrees) {
            console.log(`user1 agrees: ${game?.Round?.[roundNumber - 1]?.user1Agrees}`)
            console.log(`user2 agrees: ${game?.Round?.[roundNumber - 1]?.user2Agrees}`)
            console.log('one user agrees')
        } else if (user1Agrees && user2Agrees) {
            console.log('no users agree')
        }
    }, [dispatch, gameId, roundNumber, setShowGamePlay]);

    const handleCloseEnoughSubmit = () => {
        console.log('handle close enough submit')
        const currentUserPlayerNumber = game?.user1?.username === sessionUser?.username ? 1 : 2;
        dispatch(fetchUpdateRound(roundId, `user${currentUserPlayerNumber}Agrees`, true))
    }


    const handleNextRoundSubmit = () => {
        console.log('handle next round submit')
        const currentUserPlayerNumber = game?.user1?.username === sessionUser?.username ? 1 : 2;
        dispatch(fetchUpdateRound(roundId, `user${currentUserPlayerNumber}Agrees`, false))
    }

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
        <div className="gamePlay">
            <h1>Round {roundNumber}</h1>
            {!submittedWord && !showRoundResults && roundNumber <= 1 && (
                <div className="roundOne">
                    <div>
                        <h2>
                            Enter any word, and in the next round, you and your game partner will try to read each other's minds and enter the same word using your previous words.
                        </h2>
                    </div>
                    <div className="wordInputDiv">
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
            {showRoundResults &&
                <div className="roundResults">
                    <h2>Round Results</h2>
                    <h3>{friendUser?.username}'s word: {friendWordText}</h3>
                    <h3>Your Word: {userWordText}</h3>
                    <div>
                        <button
                            onClick={handleCloseEnoughSubmit}
                        >Close Enough</button>
                        <button
                            onClick={handleNextRoundSubmit}
                        >Next Round</button>
                    </div>
                </div>

            }
            {roundNumber > 1 && (
                <div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default GamePlay;
