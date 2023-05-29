import React from "react";

const GameInviteRequestComponent = ({ sender }) => {

    console.log('sender:', sender)

    const acceptGameInvite = () => {
        console.log('accept game invite')
    }

    const declineGameInvite = () => {
        console.log('decline game invite')
    }

    return (
        <div>
            <h1>New Game invite from {sender}</h1>
            <div>
                <button>Accept</button>
                <button>Decline</button>
            </div>
        </div>

    )

}

export default GameInviteRequestComponent
