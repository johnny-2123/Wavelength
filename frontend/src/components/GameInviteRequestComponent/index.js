import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCreateRound } from '../../store/rounds';
import { useHistory } from 'react-router-dom';
import { createGame } from '../../store/game';
import { useModal } from '../../context/modal';
import styles from './GameInviteRequest.module.css';

const GameInviteRequestComponent = ({ sender, sendMessage, user1Id, user2Id, sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleAcceptGameInvite = () => {
        dispatch(createGame(user1Id, user2Id))
            .then((createdGame) => {
                dispatch(fetchCreateRound(createdGame.id))
                    .then(() => {
                        history.push(`/gameplay/${createdGame.id}`);
                    })
                    .catch((error) => {
                        console.log('error creating round', error);
                    });

                sendMessage('accepted-game-invite', {
                    newGameId: createdGame.id,
                    user1: sender,
                    user2: sessionUser?.username,
                });
            })
            .catch((error) => {
                console.log('error creating game', error);
            });
    };

    const handleDeclineGameInvite = () => {
        sendMessage('declined-game-invite', {
            sender: sessionUser?.username,
            recipient: sender,
        });
    };


    return (
        <div className={styles.gameInvite}>
            <h1>Game invite from {sender}</h1>
            <div className={styles.gameInviteButtons}>
                <button onClick={handleAcceptGameInvite}>Accept</button>
                <button onClick={handleDeclineGameInvite}>Decline</button>
            </div>
        </div>
    );
};

export default GameInviteRequestComponent;
