import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../../store/game';
import LastGame from '../../Home/LoggedInHomePage/LoggedInHomePageRootLanding/Last Game';
import './AllGames.css';

const AllGames = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state?.games?.games);

    console.log('games in all games component', games)

    const gamesMapped = games?.map((game) => {
        console.log('mapped game', game)
        return (
            <LastGame mostRecentGame={game} sessionUser={sessionUser} />
        )
    })

    useEffect(() => {
        dispatch(fetchGames())
            .catch((err) => console.log(err));
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
