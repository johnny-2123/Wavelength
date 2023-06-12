import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import RecentGames from './Recent Games';
import GameDetails from './Game Details';
import { fetchGames, fetchRecentGames } from "../../store/game";
import AllGames from "./All Games";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PastGames.css';

const PastGames = ({ sessionUser, sendMessage }) => {
    const dispatch = useDispatch();
    const { path, url } = useRouteMatch();
    const pastGames = useSelector((state) => state?.games?.pastGames);

    const recentGames = useSelector((state) => state?.games?.recentGames);

    useEffect(() => {
        dispatch(fetchGames())
            .catch((err) => console.log(err));
        dispatch(fetchRecentGames())
            .catch((err) => console.log(err));
    }, [dispatch]);

    return (
        <div className="pastGamesMainDiv">
            <nav className="friendsNavBar">
                <div className='friendNavLinks'>
                    <NavLink to={`${url}/recentGames`} activeClassName="active-link">
                        Recent Games
                    </NavLink>
                    <NavLink to={`${url}/allGames`} activeClassName="active-link">
                        All Games
                    </NavLink>
                </div>
            </nav>
            <Switch>
                <Route path={`${path}/recentGames`}>
                    <RecentGames recentGames={recentGames} sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
                <Route path={`${path}/allGames`}>
                    <AllGames sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
                <Route path={`${path}/:gameId`}>
                    <GameDetails sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
            </Switch>

        </div>
    )
}

export default PastGames;
