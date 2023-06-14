import { csrfFetch } from "./csrf";

const CREATE_GAME = "game/createGame";
const UPDATE_GAME = "game/updateGame";
const GET_GAMES = "game/getGames";
const GET_GAME_BY_ID = "game/getGameById";
const DELETE_CURRENT_GAME = "game/deleteGame";
const GET_SINGLE_MOST_RECENT_GAME = "game/getSingleMostRecentGame";
const GET_RECENT_GAMES = "game/getMostRecentGames";
const DELETE_GAME_FROM_RECENT_GAMES = "game/deleteGameFromRecentGames";

export const DeleteGameFromRecentGames = (gameId) => {
    return {
        type: DELETE_GAME_FROM_RECENT_GAMES,
        payload: gameId,
    };
}

const getRecentGames = (games) => {
    return {
        type: GET_RECENT_GAMES,
        payload: games,
    };
}

export const fetchRecentGames = () => async (dispatch) => {
    const response = await csrfFetch(`/api/games/recentGames`);

    if (response.ok) {
        const games = await response.json();
        dispatch(getRecentGames(games.recentGames));
        return games;
    }
}



const getSingleMostRecentGame = (game) => {
    return {
        type: GET_SINGLE_MOST_RECENT_GAME,
        payload: game,
    };
}

export const fetchSingleMostRecentGame = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/games/recentGame`);

    if (response.ok) {
        const game = await response.json();
        dispatch(getSingleMostRecentGame(game.game));
        return game.game;
    }
}

const deleteCurrentGame = (gameId) => {
    return {
        type: DELETE_CURRENT_GAME,
        payload: gameId,
    };
}


export const fetchDeleteGame = (gameId) => async (dispatch) => {
    const response = await csrfFetch(`/api/games/${gameId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const game = await response.json();
        dispatch(deleteCurrentGame(game?.game.id))
        dispatch(DeleteGameFromRecentGames(game?.game.id));
        return game;
    }
}

const getGameById = (game) => {
    return {
        type: GET_GAME_BY_ID,
        payload: game,
    };
}

export const fetchGameById = (gameId) => async (dispatch) => {
    const response = await csrfFetch(`/api/games/${gameId}`)

    if (response.ok) {
        const game = await response.json();
        dispatch(getGameById(game));
        return game.game;
    } else {
        const data = await response.json();
        return data;
    }

}

export const getGames = (games) => {
    return {
        type: GET_GAMES,
        payload: games,
    };

}

export const fetchGames = (gameSearchQueries) => async (dispatch) => {
    const response = await csrfFetch(`/api/games`)

    if (response.ok) {
        const games = await response.json();
        dispatch(getGames(games));
        return games.games;
    } else {
        const data = await response.json();
        return data;
    }

}

export const updateGame = (gameId, gameOver) => async (dispatch) => {
    const response = await csrfFetch(`/api/games/${gameId}`, {
        method: "PUT",
        body: JSON.stringify({
            gameOver,
        }),
    });

    if (response.ok) {
        const game = await response.json();
        return game.game;
    }
    else {
        const data = await response.json();
        return data;
    }
}


export const createGame = (user1Id, user2Id) => async (dispatch) => {
    const response = await csrfFetch(`/api/games`, {
        method: "POST",
        body: JSON.stringify({
            user1Id,
            user2Id,
        }),
    });

    if (response.ok) {
        const game = await response.json();
        return game.game;
    }
    else {
        const data = await response.json();
        return data;
    }
}


const initialState = {
    games: [],
    currentGame: {},
    previousGame: {},
    mostRecentGame: {},
    recentGames: [],
};


const gameReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_GAMES:
            return { ...state, games: action.payload.games };
        case GET_GAME_BY_ID:
            return { ...state, currentGame: action.payload.game };
        case CREATE_GAME:
            return { ...state, currentGame: action.payload };
        case UPDATE_GAME:
            return { ...state, currentGame: action.payload };
        case DELETE_CURRENT_GAME:
            newState = { ...state };
            if (newState.currentGame.id === action.payload) {
                newState.currentGame = null;
            }
            return newState;
        case GET_SINGLE_MOST_RECENT_GAME:
            newState = { ...state };
            newState.mostRecentGame = action.payload;
            return newState;
        case GET_RECENT_GAMES:
            newState = { ...state };
            newState.recentGames = action.payload;
            return newState;
        case DELETE_GAME_FROM_RECENT_GAMES:
            newState = { ...state };
            const gameToDelete = newState.recentGames.find((game) => game?.id === action.payload);
            const gameToDeleteIdx = newState.recentGames.indexOf(gameToDelete);
            newState.recentGames.splice(gameToDeleteIdx, 1);
            return newState;
        default:
            return state;
    }
}

export default gameReducer;
