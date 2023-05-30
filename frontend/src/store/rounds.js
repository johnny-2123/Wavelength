import { csrfFetch } from "./csrf";

const CREATE_ROUND = "round/createRound";

const createRound = (round) => {
    return {
        type: CREATE_ROUND,
        payload: round,
    };

}

export const fetchCreateRound = (gameId) => async (dispatch) => {
    console.log("running redux store fetchCreateRound");
    console.log("gameId: ", gameId);

    const response = await csrfFetch(`/api/games/${gameId}/rounds`, {
        method: "POST"
    })

    if (response.ok) {
        const round = await response.json();
        dispatch(createRound(round));
        console.log("round created in redux store: ", round.round);
        return round.round;
    } else {
        const data = await response.json();
        console.log("error in fetchCreateRound");
        console.log(data);
        return data;
    }

}
