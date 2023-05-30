import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById, updateGame } from "../../store/game";
import { fetchCreateWord } from "../../store/words";

import { useDispatch, useSelector } from "react-redux";

const GamePlay = ({ setShowGamePlay }) => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    console.log('gameId', gameId)

    const game = useSelector((state) => state?.games?.currentGame)

    const roundNumber = game?.Round?.length;
    const round = game?.Round?.[roundNumber - 1];
    const roundId = game?.Round?.[roundNumber - 1]?.id;

    const [wordText, setWordText] = useState("");
    const [submittedWord, setSubmittedWord] = useState(false);

    useEffect(() => {
        dispatch(fetchGameById(gameId)).then((game) => {
            if (round?.Words?.length === 2) {
                if (round?.Words?.[0]?.wordText === round?.Words?.[1]?.wordText) {
                    console.log('game over')
                    setShowGamePlay(false);
                    dispatch(updateGame(gameId, true));
                }
            }
        }).catch((error) => {
            console.log('error fetching game', error);
        });

        if (round?.Words?.length === 2) {
            if (round?.Words?.[0]?.wordText === round?.Words?.[1]?.wordText) {
                console.log('game over')
                dispatch(updateGame(gameId, true));
            }
        }

    }, [dispatch, submittedWord]);

    useEffect(() => {
        if (game && !game?.gameOver) {
            console.log('game not over')
            setShowGamePlay(true);
        } else {
            console.log('game is over')
            setShowGamePlay(false);
        }
    }, [game, setShowGamePlay])

    const handleSubmitWord = (e) => {
        e.preventDefault();
        dispatch(fetchCreateWord(roundId, wordText)).then((word) => {
            console.log('word', word)
            setSubmittedWord(true);
        }).catch((error) => {
            console.log('error creating word', error);
        })
    }

    return (
        <>
            {roundNumber <= 1 &&
                <div>
                    <h1>Round {roundNumber}</h1>
                    <div>
                        <div>
                            <h2>Enter any word, and in the next round, you and your game partner will try to read each other's minds and enter the same word using your previous words</h2>
                        </div>
                    </div>
                    <div>
                        <div>
                            {!submittedWord && <form>
                                <input
                                    type="text"
                                    value={wordText}
                                    onChange={(e) => setWordText(e.target.value)}
                                    placeholder="Enter your word" />
                                <button
                                    type="submit"
                                    onClick={handleSubmitWord}
                                >Submit</button>
                            </form>}
                        </div>
                    </div>
                </div>}

            {roundNumber > 1 &&
                <div>
                    <h1>Round {roundNumber}</h1>
                    <div>
                        <div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>}
        </>
    )
}

export default GamePlay
