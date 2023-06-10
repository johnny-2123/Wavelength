import React from "react";
import './DemoFollowingRound.css';

const DemoFollowingRoundInput = () => {

    return (

        <div className={'demoFollowingRounds'}>
            <div className={'demoPreviousWords'}>
                <h2 id="demoRoundResults">Previous Words</h2>
                <div className={'demoLastRoundWords'}>
                    <div>
                        <h5>{'partner'}</h5>
                        <h6 id="demoRoundResults" className={'demoFriendUserLastRoundWord'} >{'taylor swift'}</h6>
                    </div>
                    <div>
                        <h5>You</h5>
                        <h6 id="demoRoundResults" >{'bowser'}</h6>
                    </div>
                </div>
            </div>
            <div className={'demoFollowingRoundDirectionsDiv'}>
                <h2 id="demoRoundResults" className={'demoFollowingRoundsDirections'}>
                    Try to enter the same word as your partner using the words from the previous round.
                </h2>
            </div>
            <div className={'demoWordInputDiv'}>
                <form>
                    <input
                        type="text"
                        value={'anti hero'}
                        placeholder="Enter your word"
                    />
                    <button
                        className={'demoSubmitButtonClassName'}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className={'demoGameOverDiv'}>
                <button >End Game</button>
                {<p>{'30'} seconds left</p>}
            </div>
        </div>

    );
};

export default DemoFollowingRoundInput;
