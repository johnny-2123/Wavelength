import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById, updateGame } from "../../store/game";
import { fetchCreateRound, fetchUpdateRound } from "../../store/rounds";
import { fetchCreateWord } from "../../store/words";
import "./Gameplay.css";

const GamePlay = ({
    setShowGamePlay,
    sessionUser,
    sendMessage,
    showRoundResults,
    playerReady,
    setPlayerReady,
}) => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    const game = useSelector((state) => state.games.currentGame);

    const [wordText, setWordText] = useState("");
    const [submittedWord, setSubmittedWord] = useState(false);
    const roundNumber = game?.Round?.length;
    const round = game?.Round?.[roundNumber - 1];
    const roundId = round?.id;
    const roundWords = round?.Words;
    const friendUser =
        game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;
    const friendWord = roundWords?.find((word) => word?.userId !== sessionUser?.id);
    const friendWordText = friendWord?.wordText;
    const previousRound = game?.Round?.[roundNumber - 2];
    const previousRoundWords = previousRound?.Words;
    const previousRoundFriendWord = previousRoundWords?.find(
        (word) => word?.userId !== sessionUser?.id
    );
    const previousRoundFriendWordText = previousRoundFriendWord?.wordText;
    const previousRoundUserWord = previousRoundWords?.find(
        (word) => word?.userId === sessionUser?.id
    );
    const previousRoundUserWordText = previousRoundUserWord?.wordText;
    const userWord = roundWords?.find((word) => word?.userId === sessionUser?.id);
    const userWordText = userWord?.wordText;

    const handleGameStatus = useCallback(
        (game) => {
            const currentRound = game?.Round?.[roundNumber - 1];
            const { user1Agrees, user2Agrees, user1Ready, user2Ready, Words = [] } =
                currentRound || {};

            console.log("user1Agrees", user1Agrees);
            console.log("user2Agrees", user2Agrees);
            console.log("user1Ready", user1Ready);
            console.log("user2Ready", user2Ready);

            if (Words.length === 2) {
                if (Words[0]?.wordText === Words[1]?.wordText) {
                    dispatch(updateGame(gameId, true)).then((updatedGame) => {
                        sendMessage("send-game-won-message", {
                            gameId: updatedGame?.id,
                            user1: updatedGame?.user1?.username,
                            user2: updatedGame?.user2?.username,
                        });
                    });
                } else {
                    sendMessage("send-round-results", {
                        gameId: game?.id,
                        user1: game?.user1?.username,
                        user2: game?.user2?.username,
                    });
                }
            }

            if (Words.length === 2) {
                if (user1Agrees && user2Agrees) {
                    dispatch(updateGame(gameId, true)).then((updatedGame) => {
                        sendMessage("send-game-won-message", {
                            gameId: updatedGame?.id,
                            user1: updatedGame?.user1?.username,
                            user2: updatedGame?.user2?.username,
                        });
                    });
                } else if (user1Agrees || user2Agrees) {
                    sendMessage("send-round-results", {
                        gameId: game?.id,
                        user1: game?.user1?.username,
                        user2: game?.user2?.username,
                    });
                }
                else if (user1Ready && user2Ready) {
                    dispatch(fetchCreateRound(gameId)).then(() => {
                        sendMessage("send-start-new-round", {
                            gameId: game?.id,
                            user1: game?.user1?.username,
                            user2: game?.user2?.username,
                        });
                    });
                }
            }

            if ((user1Agrees && user2Ready) || (user1Ready && user2Agrees)) {
                console.log('one user agrees and the other user is ready');
                dispatch(fetchCreateRound(gameId))
                    .then(() => {
                        sendMessage('send-start-new-round', {
                            gameId: game?.id,
                            user1: game?.user1?.username,
                            user2: game?.user2?.username
                        });
                    });
            }
        },
        [dispatch, gameId, roundNumber, sendMessage]
    );

    const handleCloseEnoughSubmit = () => {
        const currentUserPlayerNumber =
            game?.user1?.username === sessionUser?.username ? 1 : 2;
        const agreementString = `user${currentUserPlayerNumber}Agrees`;
        dispatch(fetchUpdateRound(roundId, agreementString, true))
            .then(() => setPlayerReady(true))
            .catch((error) =>
                console.log("error updating round with handleCloseEnoughSubmit", error)
            );
    };

    const handleNextRoundSubmit = () => {
        const currentUserPlayerNumber =
            game?.user1?.username === sessionUser?.username ? 1 : 2;
        const agreementString = `user${currentUserPlayerNumber}Ready`;
        dispatch(fetchUpdateRound(roundId, agreementString, true))
            .then(() => setPlayerReady(true))
            .catch((error) =>
                console.log("error updating round with handleNextRoundSubmit", error)
            );
    };

    const handleSubmitWord = (e) => {
        e.preventDefault();
        dispatch(fetchCreateWord(roundId, wordText))
            .then(() => setSubmittedWord(true))
            .catch((error) => console.log("error creating word", error));
    };

    useEffect(() => {
        dispatch(fetchGameById(gameId))
            .then(handleGameStatus)
            .then(() => {
                if (!userWord) {
                    setSubmittedWord(false);
                    setWordText("");
                }
            })
            .catch((error) => {
                console.log("error fetching game", error);
            });
    }, [dispatch, gameId, submittedWord, playerReady]);

    useEffect(() => {
        setShowGamePlay(!game?.gameOver);
    }, [game, setShowGamePlay]);

    return (
        <div className="gamePlay">
            <h1>Round {roundNumber}</h1>
            {!userWord && !showRoundResults && roundNumber === 1 && (
                <div className="roundOne">
                    <div>
                        <h2>
                            Enter any word, and in the next round, you and your partner will
                            try to sync minds and enter the same word using your previous
                            words.
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

            {!userWord && !showRoundResults && roundNumber > 1 && (
                <div className="followingRounds">
                    <div className="previousWords">
                        <div className="partnerPreviousWord">
                            <h2>
                                {friendUser?.username}'s Previous Word:{" "}
                                {previousRoundFriendWordText}
                            </h2>
                        </div>
                        <div className="yourPreviousWord">
                            <h2>Your Previous Word: {previousRoundUserWordText}</h2>
                        </div>
                    </div>
                    <div>
                        <h2>
                            Enter a word related to yours and your partner's previous words
                            that you think your partner will also enter.
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

            {showRoundResults && (
                <div className="roundResults">
                    <h2>Round Results</h2>
                    <h3>
                        {friendUser?.username}'s word: {friendWordText}
                    </h3>
                    <h3>Your Word: {userWordText}</h3>
                    <div>
                        <button onClick={handleCloseEnoughSubmit}>Close Enough</button>
                        <button onClick={handleNextRoundSubmit}>Next Round</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePlay;
