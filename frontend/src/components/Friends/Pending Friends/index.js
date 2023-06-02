import React, { useState } from "react";
import { NavLink, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { fetchAcceptFriendRequest, fetchRejectFriendRequest } from "../../../store/friends";
import "./PendingFriends.css";


const PendingFriends = ({ friends, sessionUser }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const pendingFriendRequestsReceived = friends?.filter((friend) => friend.status === "pending" && friend.friendId === sessionUser?.id);

    const pendingFriendRequestsReceivedMapped = pendingFriendRequestsReceived?.map((friend) => {
        const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

        const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

        return (
            <div key={friend.id} className="friendItem">
                <div className="friendIconDiv">
                    <i id={friendIconId} className="fa-regular fa-user"></i>
                </div>
                <div className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName"> {friendUser?.firstName}</div>
                </div>
                <button
                    onClick={() => handleAcceptFriendRequest(friendUser.id, "accepted")}
                >Accept Friend Request</button>
                <button
                    onClick={() => handleRejectFriendRequest(friendUser.id, "rejected")}
                >Decline Friend Request</button>
            </div>
        );
    });

    const handleRejectFriendRequest = async (friendId, status) => {
        return dispatch(fetchRejectFriendRequest(friendId, status))
            .then(async (data) => {
                if (data && data.message) {
                    setErrors([]);
                    setMessage(data.message);
                }

                console.log('data', data);
            })
            .catch(async (res) => {
                console.log('res', res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log('data', data.errors);
            });
    };

    const handleAcceptFriendRequest = async (friendId, status) => {
        return dispatch(fetchAcceptFriendRequest(friendId, status))
            .then(async (data) => {
                if (data && data.message) {
                    setErrors([]);
                    setMessage(data.message);
                }


                console.log('data', data);
            })
            .catch(async (res) => {
                console.log('res', res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log('data', data.errors);
            });
    };


    return (
        <div className="friendsContainer">
            {pendingFriendRequestsReceivedMapped}
        </div>)
};

export default PendingFriends;
