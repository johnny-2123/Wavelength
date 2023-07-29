import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGameById } from "../../store/game";
import { fetchUpdateRound } from "../../store/rounds";
import { fetchCreateWord } from "../../store/words";
import RoundOneForm from "./Round One Form/RoundOneForm";
import FollowingRoundsForm from "./FollowingRoundsForm";
import RoundResults from "./Round Results/RoundResults";
import useGameStatus from "./useGameStatus";
import WaitingforPartnerWord from "./WaitingForPartnerWord";
import "./Gameplay.css";

const GamePlay = ({
  setShowGamePlay,
  sessionUser,
  sendMessage,
  setShowRoundResults,
  showRoundResults,
  playerReady,
  setPlayerReady,
  game,
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
  const friendWord = roundWords?.find(
    (word) => word?.userId !== sessionUser?.id
  );
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

  const shouldRenderFollowingRoundsForm =
    !userWord && !showRoundResults && previousRoundWords && roundNumber > 1;

  const handleGameStatus = useGameStatus(gameId, roundNumber, sendMessage);

  const handleRoundSubmit = (agreementString) => {
    dispatch(fetchUpdateRound(roundId, agreementString, true))
      .then(() => {
        setPlayerReady(true);
      })
      .catch((error) => {});
  };

  const handleCloseEnoughSubmit = () => {
    const currentUserPlayerNumber =
      game?.user1?.username === sessionUser?.username ? 1 : 2;
    const agreementString = `user${currentUserPlayerNumber}Agrees`;
    handleRoundSubmit(agreementString);
  };

  const handleNextRoundSubmit = () => {
    const currentUserPlayerNumber =
      game?.user1?.username === sessionUser?.username ? 1 : 2;
    const agreementString = `user${currentUserPlayerNumber}Ready`;
    handleRoundSubmit(agreementString);
  };

  const handleSubmitWord = (e) => {
    e.preventDefault();
    dispatch(fetchCreateWord(roundId, wordText))
      .then(() => {
        setShowRoundResults(false);
        setSubmittedWord(true);
      })
      .catch((error) => {});
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
      .catch((error) => {});
  }, [dispatch, gameId, submittedWord, playerReady]);

  useEffect(() => {
    setShowGamePlay(!game?.gameOver);
    if (roundWords?.length === 2) {
      setShowRoundResults(true);
    }
  }, [game, setShowGamePlay]);

  return (
    <div className="gamePlay">
      <h1 className="gamePlayRound">Round {roundNumber}</h1>
      {!userWord && !showRoundResults && roundNumber === 1 && (
        <RoundOneForm
          onSubmit={handleSubmitWord}
          wordText={wordText}
          setWordText={setWordText}
          setShowRoundResults={setShowRoundResults}
        />
      )}

      {shouldRenderFollowingRoundsForm && (
        <FollowingRoundsForm
          onSubmit={handleSubmitWord}
          wordText={wordText}
          setWordText={setWordText}
          friendUser={friendUser}
          previousRoundFriendWordText={previousRoundFriendWordText}
          previousRoundUserWordText={previousRoundUserWordText}
          sendMessage={sendMessage}
          gameId={gameId}
          setShowRoundResults={setShowRoundResults}
        />
      )}

      {userWord && !showRoundResults && (
        <WaitingforPartnerWord
          friendUser={friendUser}
          userWordText={userWordText}
        />
      )}

      {showRoundResults &&
        roundWords.length === 2 &&
        !shouldRenderFollowingRoundsForm && (
          <RoundResults
            onCloseEnoughSubmit={handleCloseEnoughSubmit}
            onNextRoundSubmit={handleNextRoundSubmit}
            friendUser={friendUser}
            friendWordText={friendWordText}
            userWordText={userWordText}
            sendMessage={sendMessage}
            gameId={gameId}
            setShowRoundResults={setShowRoundResults}
          />
        )}
    </div>
  );
};

export default React.memo(GamePlay);
