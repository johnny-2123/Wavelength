import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { areWordsSimilar } from "../../../../GamePlay/useGameStatus";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LastGame.module.css";

const LastGame = ({ mostRecentGame, sessionUser }) => {
  const history = useHistory();
  const location = useLocation();
  const currentURL = location.pathname;
  const mostRecentGameFinalRound =
    mostRecentGame?.Round?.[mostRecentGame?.Round?.length - 1];
  const mostRecentGameFinalRoundWords = mostRecentGameFinalRound?.Words;
  const mostRecentGameUserWord = mostRecentGameFinalRoundWords?.filter(
    (word) => word?.userId === sessionUser?.id
  )[0];
  const mostRecentGameFriendWord = mostRecentGameFinalRoundWords?.filter(
    (word) => word?.userId !== sessionUser?.id
  )[0];
  const friendUser =
    mostRecentGame?.user1Id === sessionUser?.id
      ? mostRecentGame?.user2
      : mostRecentGame?.user1;

  const gameWon = areWordsSimilar(
    mostRecentGameFriendWord?.wordText,
    mostRecentGameUserWord?.wordText
  );

  const handleLastGameClick = (e) => {
    e.stopPropagation();
    history.push(`/games/${mostRecentGame?.id}`);
  };

  if (!mostRecentGame) return null;

  return (
    <motion.div
      onClick={handleLastGameClick}
      className={styles.mostRecentSingleGame}
      whileHover={{ scale: 0.98, transition: { duration: 0.1 } }}
    >
      <div className={styles.mostRecentSingleGameSubDiv}>
        {!currentURL.includes("allGames") && (
          <h2 className={styles.lastGameTitle}>Last Game</h2>
        )}
        <h4>Final Words</h4>
        <div className={styles.mostRecentGameFinalWords}>
          <div>
            <h5>{friendUser?.username}</h5>
            <h6
              className={`${styles.friendUserLastGameWord} ${styles.mostRecentGameWord}`}
            >
              {mostRecentGameFriendWord?.wordText}
            </h6>
          </div>
          <div>
            <h5>{sessionUser?.username}</h5>
            <h6 className={styles.mostRecentGameWord}>
              {mostRecentGameUserWord?.wordText}
            </h6>
          </div>
        </div>
        <div className={styles.gameOutcome} id={styles.gameOutcome}>
          <h2 className={styles.gameOutcomeTitle}>Outcome</h2>
          {gameWon && (
            <>
              <h3 className={styles.gameOutcomeSuccess}>Wavelength Aligned </h3>
              <div className={styles.gameOutcomeSuccess}>
                <i className="fa-solid fa-face-smile-beam"></i>
                <i className="fa-solid fa-face-smile-beam"></i>
                <i className="fa-solid fa-face-smile-beam"></i>
              </div>
            </>
          )}
          {!gameWon && (
            <>
              <h3 className={styles.gameOutcomeFailed}>
                Wavelength Not Aligned{" "}
              </h3>
              <div className={styles.gameOutcomeFailed}>
                <i className="fa-solid fa-sad-tear"></i>
                <i className="fa-solid fa-sad-tear"></i>
                <i className="fa-solid fa-sad-tear"></i>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LastGame;
