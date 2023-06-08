import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchGameById, fetchDeleteGame, DeleteGameFromRecentGames } from "../../store/game";
import { DeleteGameFromFriendDetails } from "../../store/friends";
import { toast, Slide } from 'react-toastify';
import styles from "./GameResults.module.css";

const GameResults = ({ game, sessionUser, sendMessage }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentURL = location.pathname;
    console.log('currentURL', currentURL);
    const friendUser = game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;

    const gameWon =
        game?.Round?.[game?.Round?.length - 1]?.Words?.[0]?.wordText ===
        game?.Round?.[game?.Round?.length - 1]?.Words?.[1]?.wordText;

    const finalRound = game?.Round?.[game?.Round?.length - 1];

    const finalRoundWords = finalRound?.Words;

    const friendWord = finalRoundWords?.find((word) => word?.userId !== sessionUser?.id);
    const friendWordText = friendWord?.wordText;

    const userWord = finalRoundWords?.find((word) => word?.userId === sessionUser?.id);
    const userWordText = userWord?.wordText;

    const usersAgreed = finalRound?.user1Agrees && finalRound?.user2Agrees;

    const gameRounds = game?.Round;

    const gameRoundMapped = gameRounds?.map((round, idx) => {
        const roundWords = round?.Words;
        const friendWordText = roundWords?.find((word) => word?.userId !== sessionUser?.id)?.wordText;
        const userWordText = roundWords?.find((word) => word?.userId === sessionUser?.id)?.wordText;

        return (
            <div className={styles.RoundDiv}>
                <h2>Round {idx + 1}</h2>
                <h3>Partner's Word: {friendWordText}</h3>
                <h3>Your Word: {userWordText}</h3>
            </div>
        )

    });

    const notifyOnGameDelete = () => toast.success('Game deleted', {
        hideProgressBar: true,
        transition: Slide,
    })

    const notifyOnGameDeleteError = () => toast.error('Error deleting game', {
        hideProgressBar: true,
        transition: Slide,
    })

    const handleSendGameInvite = (e) => {
        e.stopPropagation();
        sendMessage("send-game-invite", {
            recipient: friendUser?.username,
            user1Id: sessionUser?.id,
            user2Id: friendUser?.id,
        });
    };

    const handleDeleteGame = (e) => {
        e.stopPropagation();
        dispatch(fetchDeleteGame(game?.id))
            .then((data) => {
                if (data?.message) {
                    dispatch(DeleteGameFromFriendDetails(game?.id))
                    notifyOnGameDelete();
                }
            })
            .catch((error) => {
                console.log('error deleting game', error);
                if (error) {
                    notifyOnGameDeleteError();
                }
            });
    };

    return (
        <div className={styles.gameResults}>
            <h1 className={styles.gameResultsTitle}>Game Results</h1>
            <div>
                <h2>Partner: {friendUser.username}</h2>
            </div>
            <div className={styles.gameResultHighlights}>
                <h2>Total Rounds: {game?.Round?.length}</h2>
                <div className={styles.FinalWordsDiv}>
                    <h2>Final Words</h2>
                    <div className={styles.PartnerWordDiv}>
                        <h3>Partner's Word: {friendWordText}</h3>
                    </div>
                    <div className={styles.UserWordDiv}>
                        <h3>Your Word: {userWordText}</h3>
                    </div>
                </div>
            </div>
            <div className={styles.gameResultButtons}>
                {currentURL === "/" && <button
                    onClick={(e) => handleSendGameInvite(e)}
                >Play Again</button>}
                {currentURL !== "/" && <button
                    onClick={(e) => handleDeleteGame(e)}
                >Delete Game</button>}
            </div>
            <h2 className={styles.gameRoundsTitle}>Game Rounds</h2>
            {gameRoundMapped}
        </div>
    );
};

export default GameResults;
