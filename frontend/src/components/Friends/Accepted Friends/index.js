import React, { useState } from "react";
import { NavLink, Route, Switch, useParams, useRouteMatch, useHistory } from "react-router-dom";
import "./AcceptedFriends.css";

const AcceptedFriends = ({ friends, sessionUser, sendMessage }) => {
    const history = useHistory();
    const acceptedFriends = friends?.filter((friend) => friend.status === "accepted");

    const handleSendGameInvite = (e, recipient, user2Id) => {
        e.stopPropagation();
        console.log("handling send game invite");
        console.log("user1Id", sessionUser?.id);
        console.log("user2Id", user2Id);
        sendMessage("send-game-invite", {
            recipient,
            user1Id: sessionUser?.id,
            user2Id,
        });
    };

    const handleFriendItemClick = (friendId) => {
        console.log("handling friend item click");
        history.push(`/friends/${friendId}`)
    }

    const acceptedFriendsMapped = acceptedFriends?.map((friend) => {
        const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

        const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

        const onlineStatus = friendUser?.isOnline ? true : false;

        return (
            <div
                key={friend.id} className="friendItem">
                <div className="friendIconDiv">
                    <i id={friendIconId} className="fa-regular fa-user"></i>
                </div>
                <div
                    onClick={() => handleFriendItemClick(friendUser.id)}
                    className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName">{friendUser?.firstName}</div>
                </div>
                {onlineStatus && <div className="onlineStatus"></div>}
                <div className="friendButtons">
                    <button onClick={(e) => handleSendGameInvite(e, friendUser.username, friendUser.id)}>New Game</button>
                </div>
            </div>
        );
    });

    return <div className="friendsContainer">{acceptedFriendsMapped}</div>;
};

export default AcceptedFriends;
