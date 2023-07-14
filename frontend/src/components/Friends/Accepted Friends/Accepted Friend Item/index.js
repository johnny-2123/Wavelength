import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchAcceptFriendRequest,
  fetchRejectFriendRequest,
} from "../../../../store/friends";
// import "./AcceptedFriends.css";

const AcceptedFriendItem = ({
  friend,
  sessionUser,
  sendMessage,
  handleFriendItemClick,
}) => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const friendUser =
    friend?.userId === sessionUser?.id
      ? friend?.ReceivingUser
      : friend?.RequestingUser;

  const friendIconId =
    friend.status === "accepted" ? "friendIcon" : "pendingFriendIcon";
  const onlineStatus = friendUser?.isOnline ? true : false;

  const handleSendGameInvite = (e) => {
    e.stopPropagation();
    sendMessage("send-game-invite", {
      recipient: friendUser?.username,
      user1Id: sessionUser?.id,
      user2Id: friendUser?.id,
    });
  };

  const handleRejectFriendRequest = async (e, friendId, status) => {
    e.stopPropagation();
    return dispatch(fetchRejectFriendRequest(friendId, status))
      .then(async (data) => {
        if (data && data.message) {
          setErrors([]);
          setMessage(data.message);
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
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
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div
      key={friend.id}
      onClick={() => handleFriendItemClick(friendUser.id)}
      className="friendItem"
    >
      <div className="friendItemLeftDiv">
        <img src={friendUser?.imageUrl}></img>
        <div className="friendInfo">
          <div className="friendUsername">{friendUser?.username}</div>
          <div className="friendName">{friendUser?.firstName}</div>
        </div>
      </div>
      {onlineStatus && <div className="onlineStatus"></div>}
      <div className="friendButtons">
        {friend?.status === "accepted" && (
          <button onClick={handleSendGameInvite}>
            New Game <i className="fa-solid fa-paper-plane" />
          </button>
        )}
        {friend?.status === "pending" && (
          <>
            <button
              onClick={() =>
                handleAcceptFriendRequest(friendUser.id, "accepted")
              }
            >
              Accept <i class="fa-solid fa-plus"></i>
            </button>
            <button
              onClick={(e) =>
                handleRejectFriendRequest(e, friendUser.id, "rejected")
              }
            >
              Decline <i class="fa-solid fa-minus"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptedFriendItem;
