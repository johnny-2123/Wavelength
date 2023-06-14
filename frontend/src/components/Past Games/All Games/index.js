import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../../store/game';
import LastGame from '../../Home/LoggedInHomePage/LoggedInHomePageRootLanding/Last Game';
import './AllGames.css';

const AllGames = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state?.games?.games);

    const [earliestFirst, setEarliestFirst] = useState(true);
    const [latestFirst, setLatestFirst] = useState(false);


    let latestClassName = latestFirst ? "timeQueryButtonClick" : "timeQueryButtonNotClicked";
    let earliestClassName = earliestFirst ? "timeQueryButtonClick" : "timeQueryButtonNotClicked";

    const handleLatestFirst = () => {
        if (!latestFirst) {
            setLatestFirst(true);
            setEarliestFirst(false)
        } else {
            setLatestFirst(false);
        }
    }

    const handleEarliestFirst = () => {
        if (!earliestFirst) {
            setEarliestFirst(true);
            setLatestFirst(false);
        } else {
            setEarliestFirst(false);
        }
    }

    useEffect(() => {
        let queryObject = {};
        if (earliestFirst) {
            queryObject.sort = "earliestFirst";
        } else if (latestFirst) {
            queryObject.sort = "latestFirst";
        }

        dispatch(fetchGames(queryObject))
            .catch((err) => {
                console.log(err);
            }
            );
    }, [earliestFirst, latestFirst])
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
                {/* <div className='allGamesButtons'>
                    <button className={earliestClassName} onClick={handleEarliestFirst}>Earliest First</button>
                    <button className={latestClassName} onClick={handleLatestFirst}>Latest First</button>
                </div> */}
                <div className='allGamesScroller'>
                    {gamesMapped}
                </div>
            </div>
        </div>
    )
}

export default AllGames;
