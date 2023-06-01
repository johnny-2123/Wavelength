import React from 'react';

const FollowingRoundsForm = ({ onSubmit, wordText, setWordText, friendUser, previousRoundFriendWordText, previousRoundUserWordText }) => (
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
                <button type="submit" onClick={onSubmit}>
                    Submit
                </button>
            </form>
        </div>
    </div>
);

export default FollowingRoundsForm;
