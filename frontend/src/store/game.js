import { csrfFetch } from "./csrf";

const CREATE_GAME = "game/createGame";
const UPDATE_GAME = "game/updateGame";
const GET_GAMES = "game/getGames";
const GET_GAME_BY_ID = "game/getGameById";

const getGameById = (game) => {
    return {
        type: GET_GAME_BY_ID,
        payload: game,
    };
}

export const fetchGameById = (gameId) => async (dispatch) => {
    console.log("running redux store fetchGameById");
    // console.log("gameId: ", gameId);

    const response = await csrfFetch(`/api/games/${gameId}`)

    if (response.ok) {
        const game = await response.json();
        dispatch(getGameById(game));
        // console.log("game fetched in redux store: ", game.game);
        return game.game;
    } else {
        const data = await response.json();
        // console.log("error in fetchGameById");
        console.log(data);
        return data;
    }

}

export const getGames = (games) => {
    return {
        type: GET_GAMES,
        payload: games,
    };

}

export const fetchGames = () => async (dispatch) => {
    console.log("running redux store fetchGames");

    const response = await csrfFetch(`/api/games`)

    if (response.ok) {
        const games = await response.json();
        dispatch(getGames(games));
        console.log("games fetched in redux store: ", games.games);
        return games.games;
    } else {
        const data = await response.json();
        console.log("error in fetchGames");
        console.log(data);
        return data;
    }

}

export const updateGame = (gameId, gameOver) => async (dispatch) => {
    console.log("running redux store updateGame");
    const response = await csrfFetch(`/api/games/${gameId}`, {
        method: "PUT",
        body: JSON.stringify({
            gameOver,
        }),
    });

    if (response.ok) {
        const game = await response.json();
        // dispatch({
        //     type: UPDATE_GAME,
        //     payload: game.game
        // });
        console.log("game updated in redux store: ", game.game);
        return game.game;
    }
    else {
        const data = await response.json();
        console.log("error in updateGame");
        console.log(data);
        return data;
    }
}


export const createGame = (user1Id, user2Id) => async (dispatch) => {
    // console.log("running redux store createGame");
    // console.log("user1Id: ", user1Id);
    // console.log("user2Id: ", user2Id);

    const response = await csrfFetch(`/api/games`, {
        method: "POST",
        body: JSON.stringify({
            user1Id,
            user2Id,
        }),
    });

    if (response.ok) {
        const game = await response.json();
        // console.log(" succesfully created game in redux store: ", game);
        // console.log('game id', game.game.id)
        return game.game;
    }
    else {
        const data = await response.json();
        console.log("error in createGame");
        console.log(data);
        return data;
    }
}


const initialState = {
    games: [],
    currentGame: {},
    previousGame: {},
};


const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return { ...state, games: action.payload.games };
        case GET_GAME_BY_ID:
            return { ...state, currentGame: action.payload.game };
        case CREATE_GAME:
            return { ...state, currentGame: action.payload };
        case UPDATE_GAME:
            return { ...state, currentGame: action.payload };
        default:
            return state;
    }
}

export default gameReducer;
