import React from "react";
import { useHistory } from "react-router-dom";
import './LastGame.css'

const LastGame = ({ mostRecentGame, sessionUser }) => {
    const history = useHistory();
    const mostRecentGameFinalRound = mostRecentGame?.Round?.[mostRecentGame?.Round?.length - 1];
    const mostRecentGameFinalRoundWords = mostRecentGameFinalRound?.Words;
    const mostRecentGameUserWord = mostRecentGameFinalRoundWords?.filter(word => word?.userId === sessionUser?.id)[0];
    const mostRecentGameFriendWord = mostRecentGameFinalRoundWords?.filter(word => word?.userId !== sessionUser?.id)[0];
    const friendUser =
        mostRecentGame?.user1Id === sessionUser?.id ? mostRecentGame?.user2 : mostRecentGame?.user1;

    const handleLastGameClick = (e) => {
        e.stopPropagation();
        history.push(`/games/${mostRecentGame?.id}`);
    };


    return (
        <div
            onClick={handleLastGameClick}
            className="mostRecentSingleGame">
            <div className="mostRecentSingleGameSubDiv">
                <h2 id="lastGameTitle">Last Game</h2>
                <div className="totalRounds">
                    <h2 id='totalRoundsTitle'>Total Rounds</h2>
                    <h3>{mostRecentGame?.Round?.length}</h3>
                </div>
                <h4>Final Words</h4>
                <div className="mostRecentGameFinalWords">
                    <div>
                        <h5>{friendUser?.username}</h5>
                        <h6 className="friendUserLastGameWord" >{mostRecentGameFriendWord?.wordText}</h6>
                    </div>
                    <div>
                        <h5>{sessionUser?.username}</h5>
                        <h6>{mostRecentGameUserWord?.wordText}</h6>
                    </div>
                </div>
            </div>
        </div>)

}

export default LastGame;
