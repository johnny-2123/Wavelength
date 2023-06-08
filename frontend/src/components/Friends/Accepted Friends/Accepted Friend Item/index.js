import React from "react";
import { useHistory } from "react-router-dom";
// import "./AcceptedFriends.css";

const AcceptedFriendItem = ({ friend, sessionUser, sendMessage, handleFriendItemClick }) => {
    const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

    const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

    const onlineStatus = friendUser?.isOnline ? true : false;

    const handleSendGameInvite = (e) => {
        e.stopPropagation();
        console.log("handling send game invite");
        console.log("user1Id", sessionUser?.id);
        console.log("user2Id", friendUser?.id);
        sendMessage("send-game-invite", {
            recipient: friendUser?.username,
            user1Id: sessionUser?.id,
            user2Id: friendUser?.id,
        });
    };

    return (
        <div key={friend.id} className="friendItem">
            <div className="friendIconDiv">
                <i id={friendIconId} className="fa-regular fa-user"></i>
            </div>
            <div onClick={() => handleFriendItemClick(friendUser.id)} className="friendInfo">
                <div className="friendUsername">{friendUser?.username}</div>
                <div className="friendName">{friendUser?.firstName}</div>
            </div>
            {onlineStatus && <div className="onlineStatus"></div>}
            <div className="friendButtons">
                <button onClick={handleSendGameInvite}>New Game</button>
            </div>
        </div>
    );
};

export default AcceptedFriendItem;
