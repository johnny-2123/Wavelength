import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchGames } from "../../store/game";
import './PastGames.css';

const PastGames = () => {

    return (
        <div className="pastGamesMainDiv">
            <h1>Past Games</h1>
        </div>
    )
}

export default PastGames;
