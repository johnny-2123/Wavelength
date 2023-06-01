import React from 'react';
import './FollowingRounds.css';
const FollowingRoundsForm = ({ onSubmit, wordText, setWordText, friendUser, previousRoundFriendWordText, previousRoundUserWordText }) => (
    <div className="followingRounds">
        <div className="previousWords">
            <h1>Previous Words</h1>
            <div className="previousWordsSubDiv">
                <div className="partnerPreviousWord">
                    <h2>
                        {friendUser?.username}:
                    </h2>
                    <h3>{previousRoundFriendWordText}</h3>
                </div>
                <div className="yourPreviousWord">
                    <h2>You: </h2>
                    <h3>{previousRoundUserWordText}</h3>
                </div>
            </div>
        </div>
        <div className='followingRoundDirectionsDiv'>
            <h2 className='followingRoundsDirections'>
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
                <button type="submit" onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    </div>
);

export default FollowingRoundsForm;
