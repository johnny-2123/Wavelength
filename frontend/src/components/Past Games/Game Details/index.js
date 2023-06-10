import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { fetchGameById, fetchDeleteGame } from "../../../store/game";
import { DeleteGameFromFriendDetails } from "../../../store/friends";
import { toast, Slide } from 'react-toastify';
import styles from "./GameDetails.module.css";

const GameDetails = ({ sessionUser, sendMessage }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { gameId } = useParams();
    console.log('gameId', gameId);
    const location = useLocation();
    const currentURL = location.pathname;

    const game = useSelector((state) => state.games?.currentGame);
    console.log('game', game);
    console.log('currentURL', currentURL);
    const friendUser = game?.user1?.username === sessionUser?.username ? game?.user2 : game?.user1;

    console.log('friendUser', friendUser);

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
                <div className={styles.roundWords}>
                    <h3 className={styles.friendUser}>{friendWordText}</h3>
                    <h3 className={styles.sessionUser}>{userWordText}</h3>
                </div>

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

    const handleFriendUserClick = (e) => {
        e.stopPropagation();
        history.push(`/friends/${friendUser?.id}`);
    };

    useEffect(() => {
        dispatch(fetchGameById(gameId))
            .then((game) => {
            })
            .catch((err) => {
                console.log("error in GameDetails: ", err);
            });
    }, [dispatch, gameId]);

    return (
        <div className={styles.gameResults}>
            {(!currentURL.includes('friends') && !currentURL.includes('games')) && <h1 className={styles.gameResultsTitle}>Game Results</h1>}
            {!currentURL.includes('friends') &&
                <div className={styles.gamePlayers}>
                    <h2>Players</h2>
                    <div className={styles.gamePlayersSubDiv}>
                        <div
                            className={styles.friendCircleDiv}
                            onClick={handleFriendUserClick}
                        >
                            <div className={styles.friendCircle}></div>
                            <h3>{friendUser?.username}</h3>
                        </div>
                        <div>
                            <div className={styles.userCircle}></div>
                            <h3>{sessionUser?.username}</h3>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.gameResultHighlights}>
                <div className={styles.totalRounds}>
                    <h2>Total Rounds</h2>
                    <h3>{game?.Round?.length}</h3>
                </div>
                <div className={styles.FinalWordsDiv}>
                    <h2>Final Words</h2>
                    <div className={styles.finalWordsSubDiv}>
                        <h3 className={styles.friendUser}>{friendWordText}</h3>
                        <h3 className={styles.sessionUser}>{userWordText}</h3>
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

export default GameDetails;
