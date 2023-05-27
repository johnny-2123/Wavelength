import { csrfFetch } from "./csrf";

const GET_FRIENDS = "friends/getFriends";

const getFriends = (friends) => {
    return {
        type: GET_FRIENDS,
        payload: friends,
    };
}


export const fetchFriends = () => async (dispatch) => {
    const response = await csrfFetch(`/api/friends`)

    console.log("running redux store fetchFriends");
    console.log("response: ", response);

    if (response.ok) {
        const friends = await response.json();
        console.log("friends from redux fetch: ", friends);
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
            return { ...state, friends: action.payload };
        default:
            return state;
    }
}

export default friendsReducer;
