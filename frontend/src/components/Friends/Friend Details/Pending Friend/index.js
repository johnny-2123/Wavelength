import React from "react";
import './PendingFriend.css';

const PendingFriend = ({ friend, handleAcceptFriendRequest, handleRejectFriendRequest }) => {

    return (
        <div className="pendingFriendMainDiv">
            <h1>{friend?.username}</h1>
            <h2>{friend?.firstName}</h2>
            {friend?.friendship === 'received' &&
                <div className="friendRequestReceived">
                    <button
                        onClick={() => handleAcceptFriendRequest(friend?.id)}
                        className="friendDetailsButton">Accept Friend Request <i class="fa-solid fa-user-check"></i></button>
                    <button
                        onClick={() => handleRejectFriendRequest(friend?.id)}
                        className="friendDetailsButton">Reject Friend Request <i class="fa-solid fa-user-xmark"></i></button>
                </div>
            }
            {friend?.friendship === 'sent' &&
                <h3 className="friendRequestSent" >Friend Request Sent</h3>
            }
        </div>
    )
}

export default PendingFriend;
