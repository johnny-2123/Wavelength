import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { areWordsSimilar } from "../../../../GamePlay/useGameStatus";
import './LastGame.css'

const LastGame = ({ mostRecentGame, sessionUser }) => {
    const history = useHistory();
    const location = useLocation();
    const currentURL = location.pathname;
    const mostRecentGameFinalRound = mostRecentGame?.Round?.[mostRecentGame?.Round?.length - 1];
    const mostRecentGameFinalRoundWords = mostRecentGameFinalRound?.Words;
    const mostRecentGameUserWord = mostRecentGameFinalRoundWords?.filter(word => word?.userId === sessionUser?.id)[0];
    const mostRecentGameFriendWord = mostRecentGameFinalRoundWords?.filter(word => word?.userId !== sessionUser?.id)[0];
    const friendUser =
        mostRecentGame?.user1Id === sessionUser?.id ? mostRecentGame?.user2 : mostRecentGame?.user1;

    const gameWon = areWordsSimilar(mostRecentGameFriendWord?.wordText, mostRecentGameUserWord?.wordText);

    const handleLastGameClick = (e) => {
        e.stopPropagation();
        history.push(`/games/${mostRecentGame?.id}`);
    };

    if (!mostRecentGame) return null;

    return (
        <div
            onClick={handleLastGameClick}
            className="mostRecentSingleGame">
            <div className="mostRecentSingleGameSubDiv">
                {!currentURL.includes('allGames') && <h2 id="lastGameTitle">Last Game</h2>}
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
                <div className="totalRounds">
                    <h2 id='totalRoundsTitle'>Total Rounds</h2>
                    <h3>{mostRecentGame?.Round?.length}</h3>
                </div>
                <div id={'gameOutcome'}>
                    <h2 id={'gameOutcome'} >Outcome</h2>
                    {gameWon &&
                        <>   <h3 className={'gameOutcomeSuccess'}>Wavelength Aligned </h3>
                            <div className={'gameOutcomeSuccess'}><i class="fa-solid fa-face-smile-beam"></i><i class="fa-solid fa-face-smile-beam"></i><i class="fa-solid fa-face-smile-beam"></i></div></>
                    }
                    {!gameWon &&
                        <><h3 className={'gameOutcomeFailed'}>Wavelength Not Aligned </h3>
                            <div className={'gameOutcomeFailed'}><i class="fa-solid fa-sad-tear"></i><i class="fa-solid fa-sad-tear"></i><i class="fa-solid fa-sad-tear"></i></div></>
                    }
                </div>
            </div>
        </div>)

}

export default LastGame;
