import React, { useEffect } from "react";
import { useState } from "react";
import GameResults from "../../GameResults";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RecentGames.css';

const RecentGames = ({ sessionUser, sendMessage, recentGames }) => {

    const recentGamesMapped = recentGames?.map((game) => {
        return <GameResults game={game} sessionUser={sessionUser} key={game.id} sendMessage={sendMessage} />
    })

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
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


    return (
        recentGames && (
            <Slider className="recentGamesSlider"  {...settings}>{recentGamesMapped}</Slider>
        )
    )
}

export default RecentGames;
