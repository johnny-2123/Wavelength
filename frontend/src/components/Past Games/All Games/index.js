import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../../store/game';
import LastGame from '../../Home/LoggedInHomePage/LoggedInHomePageRootLanding/Last Game';
import './AllGames.css';

const AllGames = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state?.games?.games);

    const gamesMapped = games?.map((game) => {
        return (
            <LastGame mostRecentGame={game} sessionUser={sessionUser} />
        )
    })

    useEffect(() => {
        dispatch(fetchGames())
            .catch((err) => {
            });
    }, [dispatch]);

    return (
        <div>
            <div className="allGamesMainDiv">
                {gamesMapped}
            </div>
        </div>
    )
}

export default AllGames;
