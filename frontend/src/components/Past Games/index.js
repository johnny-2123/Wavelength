import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchGames } from "../../store/game";
import './PastGames.css';

const PastGames = () => {
    const dispatch = useDispatch();
    const pastGames = useSelector((state) => state?.games?.pastGames);
    console.log('pastGames', pastGames)

    useEffect(() => {
        dispatch(fetchGames());
    }, [dispatch]);

    return (
        <div className="pastGamesMainDiv">
            <h1>Past Games</h1>
        </div>
    )
}

export default PastGames;
