import React from "react";
import "./FriendsList.css";

const FriendsList = ({ friends, sessionUser }) => {
    const acceptedFriends = friends?.filter((friend) => friend.status === "accepted");

    const acceptedFriendsMapped = acceptedFriends?.map((friend) => {
        const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

        const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

        return (
            <div key={friend.id} className="friendItem">
                <div className="friendIconDiv">
                    <i id={friendIconId} className="fa-regular fa-user "></i>
                </div>
                <div className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName">{friendUser?.firstName}</div>
                </div>
            </div>
        );
    })

    const pendingFriends = friends?.filter((friend) => friend.status === "pending");

    const pendingFriendsMapped = pendingFriends?.map((friend) => {
        const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

        const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

        return (
            <div key={friend.id} className="friendItem">
                <div className="friendIconDiv">
                    <i id={friendIconId} className="fa-regular fa-user "></i>
                </div>
                <div className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName">{friendUser?.firstName}</div>
                </div>
            </div>
        );
    })

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
