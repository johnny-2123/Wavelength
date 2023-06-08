import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import GameResults from '../GameResults';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchGames, fetchRecentGames } from "../../store/game";
import './PastGames.css';

const PastGames = ({ sessionUser, sendMessage }) => {
    const dispatch = useDispatch();
    const pastGames = useSelector((state) => state?.games?.pastGames);
    console.log('pastGames', pastGames)

    const recentGames = useSelector((state) => state?.games?.recentGames);
    console.log('recentGames in past games component', recentGames)

    const recentGamesMapped = recentGames?.map((game) => {
        return <GameResults game={game} sessionUser={sessionUser} key={game.id} sendMessage={sendMessage} />
    })

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };


    useEffect(() => {
        dispatch(fetchGames());
        dispatch(fetchRecentGames());
    }, [dispatch]);

    return (
        <div className="pastGamesMainDiv">
            <h1>Recent Games</h1>
            <Slider className="recentGamesSlider"  {...settings}>{recentGamesMapped}</Slider>
        </div>
    )
}

export default PastGames;
