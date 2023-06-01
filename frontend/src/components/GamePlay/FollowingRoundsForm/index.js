import React from 'react';
import styles from './FollowingRounds.module.css';

const FollowingRoundsForm = ({
    onSubmit,
    wordText,
    setWordText,
    friendUser,
    previousRoundFriendWordText,
    previousRoundUserWordText
}) => (
    friendUser && <div className={styles.followingRounds}>
        <div className={styles.previousWords}>
            <h2 >Previous Words</h2>
            <div className={styles.previousWordsSubDiv}>
                <div className={styles.partnerPreviousWord}>
                    <h2>{friendUser?.username}:</h2>
                    <h3>{previousRoundFriendWordText}</h3>
                </div>
                <div className={styles.yourPreviousWord}>
                    <h2>You: </h2>
                    <h3>{previousRoundUserWordText}</h3>
                </div>
            </div>
        </div>
        <div className={styles.followingRoundDirectionsDiv}>
            <h2 className={styles.followingRoundsDirections}>
                Try to enter the same word as your partner using the words from the previous round.
            </h2>
        </div>
        <div className={styles.wordInputDiv}>
            <form>
                <input
                    type="text"
                    value={wordText}
                    onChange={(e) => setWordText(e.target.value)}
                    placeholder="Enter your word"
                />
                <button type="submit" onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    </div>
);

export default FollowingRoundsForm;
