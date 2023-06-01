import React from 'react';

const RoundResults = ({ onCloseEnoughSubmit, onNextRoundSubmit, friendUser, friendWordText, userWordText }) => (
    <div className="roundResults">
        <h2>Round Results</h2>
        <h3>
            {friendUser?.username}'s word: {friendWordText}
        </h3>
        <h3>Your Word: {userWordText}</h3>
        <div>
            <button onClick={onCloseEnoughSubmit}>Close Enough</button>
            <button onClick={onNextRoundSubmit}>Next Round</button>
        </div>
    </div>
);

export default RoundResults;
