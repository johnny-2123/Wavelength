import { csrfFetch } from "./csrf";

const GET_FRIENDS = "friends/getFriends";
const UPDATE_ONLINE_STATUS = "friends/updateOnlineStatus";
const UPDATE_OFFLINE_STATUS = "friends/updateOfflineStatus";
const SEND_FRIEND_REQUEST = "friends/sendFriendRequest";


export const fetchSendFriendRequest = (friendCredential) => async (dispatch) => {
    console.log("running redux store sendFriendRequest");
    console.log("friendCredential: ", friendCredential);

    const response = await csrfFetch(`/api/friends`, {
        method: "POST",
        body: JSON.stringify({ friendCredential }),
    });

    if (response.ok) {
        const friend = await response.json();
        console.log("friend request sent in redux store: ", friend);
        // dispatch(sendFriendRequestAction(friend));
        return friend;
    } else {
        const data = await response.json();
        console.log("error in sendFriendRequest");
        console.log(data);
        return data;
    }
}

export const updateOfflineStatus = (userId, friendId) => {
    // console.log("running redux store updateOfflineStatus");
    // console.log("userId: ", userId);
    // console.log("friendId: ", friendId);
    return {
        type: UPDATE_OFFLINE_STATUS,
        payload: { userId, friendId },
    };
}


export const updateOnlineStatus = (userId, friendId) => {
    // console.log("running redux store updateOnlineStatus");
    // console.log("userId: ", userId);
    // console.log("friendId: ", friendId);
    return {
        type: UPDATE_ONLINE_STATUS,
        payload: { userId, friendId },
    };
}


const getFriends = (friends) => {
    return {
        type: GET_FRIENDS,
        payload: friends,
    };
}


export const fetchFriends = () => async (dispatch) => {
    const response = await csrfFetch(`/api/friends`)

    if (response.ok) {
        const friends = await response.json();
        dispatch(getFriends(friends));
        // console.log("friends fetched in redux store: ", friends.friends);
        return friends.friends;
    } else {
        const data = await response.json();
        console.log("error in fetchFriends");
        console.log(data);
        return data;
    }

}


const initialState = { friends: [] };

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FRIENDS:
            return { ...state, friends: action.payload.friends };
        case UPDATE_ONLINE_STATUS:
            const { userId, friendId } = action.payload;
            const newState = { ...state };
            newState.friends.forEach((friend) => {
                if (friend.RequestingUser?.id === friendId) {
                    friend.RequestingUser.isOnline = true;
                } else if (friend.ReceivingUser?.id === friendId) {
                    friend.ReceivingUser.isOnline = true;
                }
            });
            return newState;
        case UPDATE_OFFLINE_STATUS:
            const { userId: userId2, friendId: friendId2 } = action.payload;
            const newState2 = { ...state };
            newState2.friends.forEach((friend) => {
                if (friend.RequestingUser?.id === friendId2) {
                    friend.RequestingUser.isOnline = false;
                } else if (friend.ReceivingUser?.id === friendId2) {
                    friend.ReceivingUser.isOnline = false;
                }
            });
        default:
            return state;
    }
}

export default friendsReducer;
