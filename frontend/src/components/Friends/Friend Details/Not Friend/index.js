import React from "react";
import './NotFriend.css';

const NotFriend = ({ friend, handleSendFriendRequest }) => {
    return (
        <div className="friendDetailsNotFriend">
            <h1>{friend?.username}</h1>
            <h2>{friend?.firstName}</h2>
            <button
                onClick={() => handleSendFriendRequest(friend?.id, 'pending')}
                className="friendDetailsButton">Send Friend Request <i class="fa-solid fa-user-plus"></i></button>
        </div>
    )
}

export default NotFriend;
