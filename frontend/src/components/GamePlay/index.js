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


    return (
        <div>
            <h1>GamePlay start</h1>
        </div>
    )
}


export default GamePlay
