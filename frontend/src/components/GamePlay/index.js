import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGameById, updateGame } from "../../store/game";
import { fetchCreateRound, fetchUpdateRound } from "../../store/rounds";
import { fetchCreateWord } from "../../store/words";
import RoundOneForm from "./RoundOneForm";
import FollowingRoundsForm from "./FollowingRoundsForm";
import RoundResults from "./RoundResults";
import "./Gameplay.css";

const GamePlay = ({
    setShowGamePlay,
    sessionUser,
    sendMessage,
    showRoundResults,
    playerReady,
    setPlayerReady,
    game
}) => {
    const dispatch = useDispatch();
    const { gameId } = useParams();

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

    const handleGameStatus = useCallback((game) => {
        const currentRound = game?.Round?.[roundNumber - 1];
        const { user1Agrees, user2Agrees, user1Ready, user2Ready, Words = [] } = currentRound || {};

        const agreementObject = {
            gameId: game?.id,
            user1: game?.user1?.username,
            user2: game?.user2?.username,
        };

        const sendGameWonMessage = () => {
            dispatch(updateGame(gameId, true)).then((updatedGame) => {
                sendMessage("send-game-won-message", {
                    gameId: updatedGame?.id,
                    user1: updatedGame?.user1?.username,
                    user2: updatedGame?.user2?.username,
                });
            });
        };

        const sendRoundResults = () => {
            sendMessage("send-round-results", agreementObject);
        };

        const sendStartNewRound = () => {
            dispatch(fetchCreateRound(gameId)).then(() => {
                sendMessage("send-start-new-round", agreementObject);
            });
        };

        if (Words.length === 2) {
            if (Words[0]?.wordText === Words[1]?.wordText) {
                sendGameWonMessage();
            } else {
                sendRoundResults();
            }
        }

        if (Words.length === 2) {
            if (user1Agrees && user2Agrees) {
                sendGameWonMessage();
            } else if (user1Agrees || user2Agrees) {
                sendRoundResults();
            } else if (user1Ready && user2Ready) {
                sendStartNewRound();
            }
        }

        if ((user1Agrees && user2Ready) || (user1Ready && user2Agrees)) {
            sendStartNewRound();
        }
    }, [dispatch, gameId, roundNumber, sendMessage]);

    const handleRoundSubmit = (agreementString) => {
        dispatch(fetchUpdateRound(roundId, agreementString, true))
            .then(() => setPlayerReady(true))
            .catch((error) => console.log(`error updating round with ${agreementString}`, error));
    };

    const handleCloseEnoughSubmit = () => {
        const currentUserPlayerNumber = game?.user1?.username === sessionUser?.username ? 1 : 2;
        const agreementString = `user${currentUserPlayerNumber}Agrees`;
        handleRoundSubmit(agreementString);
    };

    const handleNextRoundSubmit = () => {
        const currentUserPlayerNumber = game?.user1?.username === sessionUser?.username ? 1 : 2;
        const agreementString = `user${currentUserPlayerNumber}Ready`;
        handleRoundSubmit(agreementString);
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
            {!userWord && !showRoundResults && roundNumber === 1 && (<RoundOneForm onSubmit={handleSubmitWord} wordText={wordText} setWordText={setWordText} />
            )}

            {!userWord && !showRoundResults && previousRoundWords && roundNumber > 1 && (
                <FollowingRoundsForm onSubmit={handleSubmitWord} wordText={wordText} setWordText={setWordText} friendUser={friendUser} previousRoundFriendWordText={previousRoundFriendWordText} previousRoundUserWordText={previousRoundUserWordText} />
            )}

            {showRoundResults && (
                <RoundResults onCloseEnoughSubmit={handleCloseEnoughSubmit} onNextRoundSubmit={handleNextRoundSubmit} friendUser={friendUser} friendWordText={friendWordText} userWordText={userWordText} />

            )}
        </div>
    );
};

export default GamePlay;
