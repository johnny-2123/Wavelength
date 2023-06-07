import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGame } from '../../../store/game';
import './RoundResults.css';

const RoundResults = ({ onCloseEnoughSubmit, onNextRoundSubmit, friendUser, friendWordText, userWordText, sendMessage, gameId,  }) => {
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => {
            clearInterval(countdown);
        };
    }, []);

    useEffect(() => {
        if (timer === 0) {
            onNextRoundSubmit();
        }
    }, [timer]);

    const handleBothSubmit = () => {
        onCloseEnoughSubmit();
        onNextRoundSubmit();
    };

    const sendGameOverMessage = () => {
        dispatch(updateGame(gameId, true)).then((updatedGame) => {
            sendMessage("send-game-over-message", {
                gameId: updatedGame?.id,
                user1: updatedGame?.user1?.username,
                user2: updatedGame?.user2?.username,
            });
        });
    };

    if (timer <= 0) {
        return null;
    }

    return (
        <div className="roundResults">
            <h2>Round Results</h2>
            <h3>
                {friendUser?.username}'s word: {friendWordText}
            </h3>
            <h3>Your Word: {userWordText}</h3>
            <div>
                <p>{timer > 0 ? `${timer} seconds left` : 'Time is up'}</p>
                <button onClick={handleBothSubmit}>Close Enough</button>
                <button onClick={onNextRoundSubmit}>Next Round</button>
            </div>
        </div>
    );
};

export default RoundResults;
