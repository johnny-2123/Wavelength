import React, { useEffect, useState } from "react";
import "./FriendsList.css";

const FriendsList = ({ friends, sessionUser, sendMessage }) => {
    const acceptedFriends = friends?.filter((friend) => friend.status === "accepted");

    const handleSendGameInvite = (recipient, user2Id) => {
        console.log('handling send game invite')
        console.log('user1Id', sessionUser?.id)
        console.log('user2Id', user2Id)
        sendMessage("send-game-invite", {
            recipient,
            user1Id: sessionUser?.id,
            user2Id,
        });
    };

    const acceptedFriendsMapped = acceptedFriends?.map((friend) => {
        const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

        const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

        const onlineStatus = friendUser?.isOnline ? true : false;

        return (
            <div key={friend.id} className="friendItem">
                <div className="friendIconDiv">
                    <i id={friendIconId} className="fa-regular fa-user"></i>

                </div>
                <div className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName">{friendUser?.firstName}</div>
                </div>
                {onlineStatus && <div className="onlineStatus"></div>}
                <button
                    onClick={() => handleSendGameInvite(friendUser.username, friendUser.id)}
                >
                    Send Game invite
                </button>
            </div>
        );
    });

    const pendingFriends = friends?.filter((friend) => friend.status === "pending");

    const pendingFriendsMapped = pendingFriends?.map((friend) => {
        const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

        const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

        return (
            <div key={friend.id} className="friendItem">
                <div className="friendIconDiv">
                    <i id={friendIconId} className="fa-regular fa-user"></i>
                </div>
                <div className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName">{friendUser?.firstName}</div>
                </div>
                <button>Friend Request</button>
            </div>
        );
    });



    return (
        <div className="friendsList">
            <h2 className="friendsListTitle">Friends List</h2>
            <div className="friendsContainer">
                {acceptedFriends && acceptedFriendsMapped}
                {pendingFriends && pendingFriendsMapped}
            </div>
        </div>
    );
};

export default FriendsList;
