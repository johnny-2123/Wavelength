import React, { useState } from "react";
import { NavLink, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAcceptFriendRequest, fetchRejectFriendRequest } from "../../../store/friends";
import AcceptedFriendItem from '../Accepted Friends/Accepted Friend Item';
import "./PendingFriends.css";


const PendingFriends = ({ friends, sessionUser }) => {

    const pendingFriendRequestsReceived = friends?.filter((friend) => friend.status === "pending" && friend.friendId === sessionUser?.id);

    const pendingFriendRequestsReceivedMapped = pendingFriendRequestsReceived?.map((friend) => {
        return <AcceptedFriendItem friend={friend} sessionUser={sessionUser} />
    });

    return (
        <div className="friendsContainer">
            {pendingFriendRequestsReceivedMapped}
        </div>)
};

export default PendingFriends;
