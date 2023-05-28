import { csrfFetch } from "./csrf";

const GET_FRIENDS = "friends/getFriends";
const UPDATE_ONLINE_STATUS = "friends/updateOnlineStatus";

export const updateOnlineStatus = (userId, friendId) => {
    console.log("running redux store updateOnlineStatus");
    console.log("userId: ", userId);
    console.log("friendId: ", friendId);
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
        return friends;
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
        default:
            return state;
    }
}

export default friendsReducer;
