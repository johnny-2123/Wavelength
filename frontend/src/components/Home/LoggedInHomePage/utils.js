import { updateOnlineStatus, updateOfflineStatus } from "../../../store/friends";

export const generateWebSocketURL = (sessionUser, acceptedFriendsUserNamesArray) => {
    const encodedFriends = encodeURIComponent(JSON.stringify(acceptedFriendsUserNamesArray));
    const baseWebSocketURL =
        process.env.NODE_ENV === "production"
            ? "wss://wavelength-2hp9.onrender.com"
            : process.env.REACT_APP_WS_URL;
    return `${baseWebSocketURL}?username=${sessionUser?.username}&friends=${encodedFriends}`;
};


export const handleFriendStatusChange = (dispatch, sessionUser, friends, data, statusType) => {
    let username = data.username;
    let friendId;
    friends.forEach((friend) => {
        if (friend?.RequestingUser?.username === username) {
            friendId = friend?.RequestingUser?.id;
        } else if (friend?.ReceivingUser?.username === username) {
            friendId = friend?.ReceivingUser?.id;
        }
    });
    if (statusType === 'online') {
        dispatch(updateOnlineStatus(sessionUser?.id, friendId));
    }
    if (statusType === 'offline') {
        dispatch(updateOfflineStatus(sessionUser?.id, friendId));
    }
};
