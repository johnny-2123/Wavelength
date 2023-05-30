import React from "react";
import { useDispatch } from "react-redux";
import { createGame } from '../../store/game'

const GameInviteRequestComponent = ({ sender, sendMessage, user1Id, user2Id, sessionUser }) => {
    const dispatch = useDispatch();
    console.log('game invite component')
    console.log('sender:', sender)
    console.log('user1:', user1Id)
    console.log('user2', user2Id)

    const handleAcceptGameInvite = () => {
        console.log(`handling accept game invite`)
        dispatch(createGame(user1Id, user2Id)).then((createdGame) => {
            console.log('createdGame', createdGame)

            sendMessage('accepted-game-invite', {
                newGameId: createdGame.id,
                user1: sender,
                user2: sessionUser?.username,
            })
        }).catch((error) => {
            console.log('error creating game', error)
        })
    }

    const declineGameInvite = () => {
        console.log('decline game invite')
    }

    return (
        <div>
            <h1>New Game invite from {sender}</h1>
            <div>
                <button
                    onClick={() => handleAcceptGameInvite()}
                >Accept</button>
                <button>Decline</button>
            </div>
        </div>

    )

}

export default GameInviteRequestComponent
