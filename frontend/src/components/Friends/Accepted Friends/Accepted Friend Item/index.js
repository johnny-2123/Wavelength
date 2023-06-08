import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAcceptFriendRequest, fetchRejectFriendRequest } from "../../../../store/friends";
// import "./AcceptedFriends.css";

const AcceptedFriendItem = ({ friend, sessionUser, sendMessage, handleFriendItemClick }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState("");

    const friendUser = friend?.userId === sessionUser?.id ? friend?.ReceivingUser : friend?.RequestingUser;

    const friendIconId = friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";

    const onlineStatus = friendUser?.isOnline ? true : false;

    const handleSendGameInvite = (e) => {
        e.stopPropagation();
        sendMessage("send-game-invite", {
            recipient: friendUser?.username,
            user1Id: sessionUser?.id,
            user2Id: friendUser?.id,
        });
    };


    const handleRejectFriendRequest = async (friendId, status) => {
        return dispatch(fetchRejectFriendRequest(friendId, status))
            .then(async (data) => {
                if (data && data.message) {
                    setErrors([]);
                    setMessage(data.message);
                }
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
            })
            .catch(async (res) => {
                console.log('res', res);
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                console.log('data', data.errors);
            });
    };


    return (
        <div key={friend.id} className="friendItem">
            <div className="friendItemLeftDiv">
                <div className="friendIconDiv">
                    <i class={`fa-solid fa-user ${friendIconId}`}></i>
                </div>
                <div onClick={() => handleFriendItemClick(friendUser.id)} className="friendInfo">
                    <div className="friendUsername">{friendUser?.username}</div>
                    <div className="friendName">{friendUser?.firstName}</div>
                </div>
            </div>
            {onlineStatus && <div className="onlineStatus"></div>}
            <div className="friendButtons">
                {friend?.status === 'accepted' && <button onClick={handleSendGameInvite}>New Game</button>}
                {friend?.status === 'pending' && <>
                    <button
                        onClick={() => handleAcceptFriendRequest(friendUser.id, "accepted")}
                    >Accept</button>
                    <button
                        onClick={() => handleRejectFriendRequest(friendUser.id, "rejected")}
                    >Decline</button>
                </>}
            </div>
        </div>
    );
};

export default AcceptedFriendItem;
