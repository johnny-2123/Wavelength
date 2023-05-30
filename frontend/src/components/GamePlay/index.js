import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../../store/game";
import { useDispatch, useSelector } from "react-redux";

const GamePlay = () => {
    const dispatch = useDispatch();
    const { gameId } = useParams();
    console.log('gameId', gameId)

    const game = useSelector((state) => state?.games?.currentGame)

    useEffect(() => {
        dispatch(fetchGameById(gameId));

    }, [dispatch]);

    const roundNumber = game?.Round?.length;

    return (
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
                <div>
                </div>
            </div>
        </div>
    )
}


export default GamePlay
