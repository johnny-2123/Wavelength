import React from "react";
import './DemoRoundOne.css';

const DemoRoundOneForm = () => {


    return (
        <div className="DemoRoundOne">
            <div id="demoRoundOne">
                <h2 id="demoRoundOne">
                    Enter any word to start the game. In following rounds, you will try to match your partner's word
                </h2>
            </div>
            <div className="wordInputDiv" id="demoRoundOne">
                <form id="demoRoundOne">
                    <input
                        type="text"
                        value={'bowser'}
                        placeholder="Enter your word"
                        id="demoRoundOne"
                    />
                    <button
                        id="demoRoundOne">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DemoRoundOneForm;
