import React from "react";
import './DemoGameResults.css'


const DemoGameResults = ({ game, sessionUser }) => {

    return (
        <div className={'demoGameResults'}>
            {<h1 className={'demoGameResultsTitle'}>Game Results</h1>}
            {
                <div className={'demoGamePlayers'}>
                    <h2>Players</h2>
                    <div className={'demoGamePlayersSubDiv'}>
                        <div
                            className={'demoFriendUserDiv'}
                        >
                            <div className={'demoFriendCircle'}></div>
                            <h3>Partner</h3>
                        </div>
                        <div>
                            <div className={'demoUserCircle'}></div>
                            <h3>You</h3>
                        </div>
                    </div>
                </div>
            }
            <div className={'demoGameResultHighlights'}>
                <div id="demoTotalRounds" >
                    <h2 id="demoTotalRounds" >Total Rounds</h2>
                    <h3 id="demoTotalRounds">2</h3>
                </div>
                <div id={'demoFinalWords'}>
                    <h2 id={'demoFinalWords'}>Final Words</h2>
                    <div className={'demoFinalWordsSubDiv'}>
                        <h3 id={'demoFinalWords'} className={'demoFriendUser'}>{'anti hero'}</h3>
                        <h3 id={'demoFinalWords'} className={'demoSessionUser'}>{'anti hero'}</h3>
                    </div>
                </div>
            </div>
            <h2 className={'demoGameRoundsTitle'}>Game Rounds</h2>
            <div className={'demoRoundDiv'}>
                <h2>Round 1</h2>
                <div className={'demoRoundWords'}>
                    <h3 className={'demoFriendUser'}>{'taylor swift'}</h3>
                    <h3 className={'demoSessionUser'}>{'bowser'}</h3>
                </div>

            </div>
            <div className={'demoRoundDiv'}>
                <h2>Round 2</h2>
                <div className={'demoRoundWords'}>
                    <h3 className={'demoFriendUser'}>{'anti hero'}</h3>
                    <h3 className={'demoSessionUser'}>{'anti hero'}</h3>
                </div>
            </div>
        </div>
    );
};

export default DemoGameResults;
