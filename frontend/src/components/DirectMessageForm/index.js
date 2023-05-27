import React, { useState } from "react";

const DirectMessageForm = ({ sendMessage, sessionUser, receivedMessages }) => {
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmitDirectMessage = (e) => {
        e.preventDefault();
        sendMessage("direct-message", {
            recipient,
            message,
            username: sessionUser?.username,
        });

        setMessage("");
        setRecipient("");
    };

    return (
        <div>
            <form onSubmit={handleSubmitDirectMessage}>
                <input
                    type="text"
                    placeholder="Enter recipient's username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send Direct Message</button>
            </form>
            <div>
                <h2>Received Messages</h2>
                <ul>
                    {receivedMessages.map((msg, index) => (
                        <li key={index}>
                            From {msg.sender}: {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DirectMessageForm;
