import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_GUID = "session/setGuid";
const SET_CURRENT_USER_ONLINE = "session/setCurrentUserOnline";
const SET_CURRENT_USER_OFFLINE = "session/setCurrentUserOffline";
const DEMO_LOGIN = "session/demoLogin";

export const uploadUserProfilePic = (file) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await csrfFetch("/api/session/image", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const downloadURL = await response.text();
      console.log("downloadURL in redux store", downloadURL);
      return downloadURL;
    } else {
      console.log("Error uploading image:", response.statusText);
    }
  } catch (error) {
    console.log("Error uploading image:", error);
  }
};

export const fetchDemoLogin = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/demo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user.user));
    return response;
  } else {
    const data = await response.json();
    return data;
  }
};

export const fetchSetCurrentUserOffline = () => async (dispatch) => {
  const response = await csrfFetch(`/api/session/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: false }),
  });

  if (response.ok) {
    const user = await response.json();
    return response;
  } else {
    const data = await response.json();
    return data;
  }
};

export const fetchSetCurrentUserOnline = () => async (dispatch) => {
  const response = await csrfFetch(`/api/session/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: true }),
  });

  if (response.ok) {
    const user = await response.json();
    return response;
  } else {
    const data = await response.json();
    return data;
  }
};
export const fetchSetGuid = (guid, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/guid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guid }),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setGuid(user.guid));
    return user;
  } else {
    const data = await response.json();
    return data;
  }
};

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
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
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
