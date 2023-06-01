import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById } from "../../store/game";
import styles from "./GameResults.module.css";

const GameResults = ({ gameId, sessionUser }) => {
    const dispatch = useDispatch();
    const game = useSelector((state) => state?.games?.currentGame);

    const friendUser = game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;

    const gameWon =
        game?.Round?.[game?.Round?.length - 1]?.Words?.[0]?.wordText ===
        game?.Round?.[game?.Round?.length - 1]?.Words?.[1]?.wordText;

    const finalRound = game?.Round?.[game?.Round?.length - 1];
    console.log('finalRound', finalRound);

    const finalRoundWords = finalRound?.Words;

    const friendWord = finalRoundWords?.find((word) => word?.userId !== sessionUser?.id);
    const friendWordText = friendWord?.wordText;

    const userWord = finalRoundWords?.find((word) => word?.userId === sessionUser?.id);
    const userWordText = userWord?.wordText;

    const usersAgreed = finalRound?.user1Agrees && finalRound?.user2Agrees;
    console.log('usersAgreed', usersAgreed);


    const gameRounds = game?.Round;
    console.log('gameRounds', gameRounds);

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
    useEffect(() => {
        dispatch(fetchGameById(gameId));
    }, [dispatch, gameId]);


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
                <button>Play Again</button>
            </div>
            <h2 className={styles.gameRoundsTitle}>Game Rounds</h2>
            {gameRoundMapped}
        </div>
    );
};

export default GameResults;
