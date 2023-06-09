import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import GameResults from '../GameResults';
import RecentGames from './Recent Games';
import GameDetails from './Game Details';
import { fetchGames, fetchRecentGames } from "../../store/game";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './PastGames.css';

const PastGames = ({ sessionUser, sendMessage }) => {
    const dispatch = useDispatch();
    const { path, url } = useRouteMatch();
    const pastGames = useSelector((state) => state?.games?.pastGames);
    console.log('pastGames', pastGames)

    const recentGames = useSelector((state) => state?.games?.recentGames);
    console.log('recentGames in past games component', recentGames)


    useEffect(() => {
        dispatch(fetchGames());
        dispatch(fetchRecentGames());
    }, [dispatch]);

    return (
        <div className="pastGamesMainDiv">
            <nav className="friendsNavBar">
                <div className='friendNavLinks'>
                    <NavLink to={`${url}/recentGames`} activeClassName="active-link">
                        Recent Games
                    </NavLink>

                </div>
            </nav>
            <Switch>
                <Route path={`${path}/recentGames`}>
                    <RecentGames recentGames={recentGames} sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
                <Route path={`${path}/:gameId`}>
                    <GameDetails sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
            </Switch>

        </div>
    )
}

export default PastGames;
