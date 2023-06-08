import { csrfFetch } from "./csrf";

const GET_FRIENDS = "friends/getFriends";
const UPDATE_ONLINE_STATUS = "friends/updateOnlineStatus";
const UPDATE_OFFLINE_STATUS = "friends/updateOfflineStatus";
const SEND_FRIEND_REQUEST = "friends/sendFriendRequest";
const ACCEPT_FRIEND_REQUEST = "friends/acceptFriendRequest";
const REJECT_FRIEND_REQUEST = "friends/rejectFriendRequest";
const GET_GAMES_BETWEEN_FRIENDS = "friends/getGamesBetweenFriends";
const GET_FRIEND_DETAILS = "friends/getFriendDetails";
const GET_WORDS_BETWEEN_FRIENDS = "friends/getWordsBetweenFriends";
const DELETE_GAME_FROM_FRIEND_DETAILS = "game/deleteGameFromFriendDetails";

export const DeleteGameFromFriendDetails = (gameId) => {
    return {
        type: DELETE_GAME_FROM_FRIEND_DETAILS,
        payload: gameId,
    };
}


const getWordsBetweenFriends = (words) => {
    return {
        type: GET_WORDS_BETWEEN_FRIENDS,
        payload: words,
    };
}

export const fetchWordsBetweenFriends = (friendId) => async (dispatch) => {
    console.log("fetching words between friends");
    const response = await csrfFetch(`/api/words/${friendId}`);

    if (response.ok) {
        const words = await response.json();
        console.log("words fetched in redux store: ", words.words);
        return words;
    }

}

const getFriendDetails = (friend) => {
    return {
        type: GET_FRIEND_DETAILS,
        payload: friend,
    };
}

export const fetchFriendDetails = (friendId) => async (dispatch) => {
    const response = await csrfFetch(`/api/friends/${friendId}`);

    if (response.ok) {
        const friend = await response.json();
        // console.log("friend fetched in redux store: ", friend);
        dispatch(getFriendDetails(friend.friend));
        return friend.friend;
    }
}

const getGamesBetweenFriends = (games) => {
    return {
        type: GET_GAMES_BETWEEN_FRIENDS,
        payload: games,
    };
}

export const fetchGamesBetweenFriends = (friendId) => async (dispatch) => {
    // console.log("fetching games between friends");
    const response = await csrfFetch(`/api/friends/${friendId}/games`);

    if (response.ok) {
        const games = await response.json();
        // console.log("games fetched in redux store: ", games);
        dispatch(getGamesBetweenFriends(games));
        return games;
    }
}


const rejectFriend = (friend) => {
    return {
        type: REJECT_FRIEND_REQUEST,
        payload: friend,
    };
}

export const fetchRejectFriendRequest = (friendId, status) => async (dispatch) => {

    const response = await csrfFetch(`/api/friends/${friendId}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
    });

    if (response.ok) {
        const friend = await response.json();
        console.log("friend request rejected in redux store: ", friend.friendship.RequestingUser);
        dispatch(rejectFriend(friend.friendship.RequestingUser));
        return friend;
    }

}

const acceptFriend = (friend) => {
    return {
        type: ACCEPT_FRIEND_REQUEST,
        payload: friend,
    };
}

export const fetchAcceptFriendRequest = (friendId, status) => async (dispatch) => {

    const response = await csrfFetch(`/api/friends/${friendId}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
    });

    if (response.ok) {
        const friend = await response.json();
        console.log('friend.ReceivingUser', friend.friendship.RequestingUser);
        console.log("friend request accepted in redux store: ", friend.friendship.RequestingUser);
        dispatch(acceptFriend(friend.friendship.RequestingUser));
        return friend;
    }

}


export const fetchSendFriendRequest = (friendCredential) => async (dispatch) => {

    const response = await csrfFetch(`/api/friends`, {
        method: "POST",
        body: JSON.stringify({ friendCredential }),
    });

    if (response.ok) {
        const friend = await response.json();
        console.log("friend request sent in redux store: ", friend);
        if (friend.friendship) {
            dispatch(acceptFriend(friend.friendship.RequestingUser));
        }
        return friend;
    }

};

export const updateOfflineStatus = (userId, friendId) => {
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


const initialState = {
    friends: [],
    currentFriend: {},
    gamesBetweenFriends: [],
};

const friendsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_FRIENDS:
            return { ...state, friends: action.payload.friends };
        case UPDATE_ONLINE_STATUS:
            const { userId, friendId } = action.payload;
            newState = { ...state };
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
        case ACCEPT_FRIEND_REQUEST:
            newState = { ...state };
            newState.friends.forEach((friend) => {
                if (friend.RequestingUser?.id === action.payload.id) {
                    console.log('changing status to accepted', friend.RequestingUser);
                    friend.status = "accepted";
                }
            });
            return newState;
        case REJECT_FRIEND_REQUEST:
            newState = { ...state };
            let friendToRemove = newState.friends.find((friend) => friend.RequestingUser?.id === action.payload.id);
            newState.friends.splice(newState.friends.indexOf(friendToRemove), 1);
            return newState;
        case GET_FRIEND_DETAILS:
            newState = { ...state };
            newState.currentFriend = action.payload;
            return newState;
        case GET_GAMES_BETWEEN_FRIENDS:
            newState = { ...state };
            newState.gamesBetweenFriends = action.payload.games;
            return newState;
        case DELETE_GAME_FROM_FRIEND_DETAILS:
            newState = { ...state };
            const gameToDelete = newState.gamesBetweenFriends.find((game) => game.id === action.payload);
            const gameToDeleteIndex = newState.gamesBetweenFriends.indexOf(gameToDelete);
            newState.gamesBetweenFriends.splice(gameToDeleteIndex, 1);
            return newState;
        default:
            return state;
    }
}

export default friendsReducer;
