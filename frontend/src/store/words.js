import { csrfFetch } from "./csrf";

const CREATE_WORD = 'CREATE_WORD';

export const fetchCreateWord = (roundId, wordText) => async (dispatch) => {
    const response = await csrfFetch(`/api/rounds/${roundId}/words`, {
        method: 'POST',
        body: JSON.stringify({ wordText })
    })

    if (response.ok) {
        const word = await response.json();
        console.log("word created in redux store: ", word.word);
        // dispatch(createWord(word));
        return word.word;
    } else {
        const data = await response.json();
        console.log("error in fetchCreateWord");
        console.log(data);
        return data;
    }
}
