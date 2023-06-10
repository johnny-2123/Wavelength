import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './FollowingRounds.module.css';
import { updateGame } from '../../../store/game';

const FollowingRoundsForm = ({
    onSubmit,
    wordText,
    setWordText,
    friendUser,
    previousRoundFriendWordText,
    previousRoundUserWordText,
    sendMessage,
    gameId,
    setShowRoundResults,
}) => {
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);
        setShowRoundResults(false);
        return () => {
            clearInterval(countdown);
        };
    }, []);

    useEffect(() => {
        if (timer === 0) {
            sendGameOverMessage();
        }
    }, [timer]);

    const sendGameOverMessage = () => {
        dispatch(updateGame(gameId, true)).then((updatedGame) => {
            sendMessage("send-game-over-message", {
                gameId: updatedGame?.id,
                user1: updatedGame?.user1?.username,
                user2: updatedGame?.user2?.username,
            });
        });
    };

    const isSubmitButtonDisabled = wordText.trim() === "";
    const submitButtonClassName = isSubmitButtonDisabled ? styles.disabledButton : styles.submitButton;

    return (
        friendUser && (
            <div className={styles.followingRounds}>
                <div className={styles.previousWords}>
                    <h2>Previous Words</h2>
                    <div className={styles.lastRoundWords}>
                        <div>
                            <h5>{friendUser?.username}</h5>
                            <h6 className={styles.friendUserLastRoundWord} >{previousRoundFriendWordText}</h6>
                        </div>
                        <div>
                            <h5>You</h5>
                            <h6 >{previousRoundUserWordText}</h6>
                        </div>
                    </div>
                </div>
                <div className={styles.followingRoundDirectionsDiv}>
                    <h2 className={styles.followingRoundsDirections}>
                        Try to enter the same word as your partner using the words from the previous round.
                    </h2>
                </div>
                <div className={styles.wordInputDiv}>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            value={wordText}
                            onChange={(e) => setWordText(e.target.value)}
                            placeholder="Enter your word"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitButtonDisabled}
                            className={submitButtonClassName}
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className={styles.gameOverDiv}>
                    <button onClick={sendGameOverMessage}>End Game</button>
                    {timer > 0 && <p>{timer} seconds left</p>}
                </div>
            </div>
        )
    );
};

export default FollowingRoundsForm;
