import React from "react";
import { useHistory } from "react-router-dom";
import AcceptedFriendItem from "./Accepted Friend Item";
import "./AcceptedFriends.css";

const AcceptedFriends = ({ friends, sessionUser, sendMessage }) => {
    const history = useHistory();
    const acceptedFriends = friends?.filter((friend) => friend.status === "accepted");

    const handleFriendItemClick = (friendId) => {
        history.push(`/friends/${friendId}`);
    };

    const acceptedFriendsMapped = acceptedFriends?.map((friend) => (
        <AcceptedFriendItem
            key={friend.id}
            friend={friend}
            sessionUser={sessionUser}
            sendMessage={sendMessage}
            handleFriendItemClick={handleFriendItemClick}
        />
    ));

    return <div className="friendsContainer">{acceptedFriendsMapped}</div>;
};

export default AcceptedFriends;
