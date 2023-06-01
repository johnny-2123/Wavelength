import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_GUID = "session/setGuid";
const SET_CURRENT_USER_ONLINE = "session/setCurrentUserOnline";
const SET_CURRENT_USER_OFFLINE = "session/setCurrentUserOffline";

export const fetchSetCurrentUserOffline = () => async (dispatch) => {
    console.log("running redux store setCurrentUserOffline");

    const response = await csrfFetch(`/api/session/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: false })
    })

    if (response.ok) {
        // console.log("fetchSetcurrentUserOffline response ok");
        const user = await response.json();
        // console.log("user: ", user);
        return response;
    } else {
        const data = await response.json();
        console.log("error in fetchSetCurrentUserOffline");
        console.log(data);
        return data;
    }
}

export const fetchSetCurrentUserOnline = () => async (dispatch) => {
    console.log("running redux store setCurrentUserOnline");

    const response = await csrfFetch(`/api/session/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true })
    })

    if (response.ok) {
        console.log("fetchSetcurrentUserOnline response ok");
        const user = await response.json();
        console.log("user: ", user);
        return response;
    } else {
        const data = await response.json();
        console.log("error in fetchSetCurrentUserOnline");
        console.log(data);
        return data;
    }
}
export const fetchSetGuid = (guid, userId) => async (dispatch) => {
    console.log("running redux store fetchSetGuid", guid);

    const response = await csrfFetch(`/api/users/${userId}/guid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ guid })
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(setGuid(user.guid));
        return user;
    } else {
        const data = await response.json();
        console.log("error in fetchSetGuid");
        console.log(data);
        return data;
    }
}

const setGuid = (guid) => {
    return {
        type: SET_GUID,
        payload: guid,
    };
};

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};


export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};



export default sessionReducer;
