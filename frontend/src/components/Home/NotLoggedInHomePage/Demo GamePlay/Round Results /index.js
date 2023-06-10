import React from "react";
import './DemoRoundResults.css';

const DemoRoundResults = () => {

    return (
        <div className="DemoRoundResults">
            <h2 id="demoRoundResults">Round Results</h2>
            <div className={"mostRecentGameFinalWords"}>
                <div>
                    <h5 id="demoRoundResults">{'partner'}</h5>
                    <h6 id="demoRoundResults" className="friendUserLastGameWord" >{'taylor swift'}</h6>
                </div>
                <div >
                    <h5 id="demoRoundResults">You</h5>
                    <h6 id="demoRoundResults">{'bowser'}</h6>
                </div>
            </div>
            <div>
                <p>{`5 seconds left`}</p>
                <button>Close Enough</button>
                <button>Next Round</button>
            </div>
        </div>
    );
};


export default DemoRoundResults;
