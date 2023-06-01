import React from 'react';

const RoundOneForm = ({ onSubmit, wordText, setWordText }) => (
    <div className="roundOne">
        <div>
            <h2>
                Enter any word, and in the next round, you and your partner will
                try to sync minds and enter the same word using your previous
                words.
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

export default RoundOneForm;
