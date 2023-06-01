import React from 'react';

const RoundOneForm = ({ onSubmit, wordText, setWordText }) => (
    <div className="roundOne">
        <div>
            <h2>
                Enter any word to start the game. In following rounds, you will try to match your partner's word
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
