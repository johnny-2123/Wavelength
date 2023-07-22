import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSendFriendRequest } from "../../../store/friends";
import "./AddFriend.css";

const AddFriend = () => {
  const dispatch = useDispatch();
  const [friendCredential, setFriendCredential] = useState("");
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddFriend = async (e) => {
    e.preventDefault();
    return dispatch(fetchSendFriendRequest(friendCredential))
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
    <div className="addFriendMainDiv">
      <h1>Add New Friend</h1>
      <form onSubmit={handleAddFriend}>
        <input
          type="text"
          value={friendCredential}
          onChange={(e) => setFriendCredential(e.target.value)}
          placeholder="Enter username or email"
        />
        <ul className="addFriendForm-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <ul className="addFriendform-message">
          {message && <li>{message}</li>}
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFriend;
