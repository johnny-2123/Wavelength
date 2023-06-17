import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from '../../../store/game';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import LastGame from '../../Home/LoggedInHomePage/LoggedInHomePageRootLanding/Last Game';
import './AllGames.css';

const AllGames = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state?.games?.games);

    const [earliestFirst, setEarliestFirst] = useState(true);
    const [latestFirst, setLatestFirst] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    let latestClassName = latestFirst ? "timeQueryButtonClick" : "timeQueryButtonNotClicked";
    let earliestClassName = earliestFirst ? "timeQueryButtonClick" : "timeQueryButtonNotClicked";

    const handleLatestFirst = (e) => {
        e.stopPropagation();
        if (!latestFirst) {
            setLatestFirst(true);
            setEarliestFirst(false);
        } else {
            setLatestFirst(false);
        }
    };

    const handleEarliestFirst = (e) => {
        e.stopPropagation();
        if (!earliestFirst) {
            setEarliestFirst(true);
            setLatestFirst(false);
        } else {
            setEarliestFirst(false);
        }
    };

    useEffect(() => {
        let queryObject = {};

        if (earliestFirst) {
            queryObject.sort = "earliestFirst";
        } else if (latestFirst) {
            queryObject.sort = "latestFirst";
        }

        const queryString = new URLSearchParams(queryObject).toString();

        dispatch(fetchGames(`?${queryString}`))
            .catch((err) => {
                console.log(err);
            });
    }, [earliestFirst, latestFirst]);


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

    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownClose = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 800);
    };



    return (
        <div className="allGamesMainDiv">
            <div className="allGamesDropdown">
                <div className="dropdownContainer" onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose}>
                    <FontAwesomeIcon icon={faFilter} className="filterIcon" />
                    {isDropdownOpen && (
                        <div className="allGamesDropdownContent">
                            <button className={earliestClassName} onClick={handleEarliestFirst}>
                                Earliest First
                            </button>
                            <button className={latestClassName} onClick={handleLatestFirst}>
                                Latest First
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div id="allGamesScroller">{gamesMapped}</div>
        </div>
    );

}

export default AllGames;
