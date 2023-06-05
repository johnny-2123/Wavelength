import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesBetweenFriends, fetchFriendDetails, fetchWordsBetweenFriends } from "../../../store/friends";
import GameResults from "../../GameResults";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FriendDetails.css";

const FriendDetails = () => {
    const dispatch = useDispatch();
    const { friendId } = useParams();
    console.log("friendId: ", friendId);

    const friend = useSelector((state) => state.friends.currentFriend);

    const games = useSelector((state) => state.friends.gamesBetweenFriends);
    console.log("games between friends: ", games);

    const sessionUser = useSelector((state) => state.session.user);

    const gamesMapped = games?.map((game) => {
        return <GameResults game={game} sessionUser={sessionUser} key={game.id} />
    });



    const numGamesWon = games?.reduce((acc, game) => {
        let lastRound = game.Round[game?.Round?.length - 1];
        const lastRoundWords = lastRound?.Words;
        if (lastRound?.user1Agrees && lastRound?.user2Agrees) {
            return acc + 1;
        } else if (lastRoundWords && lastRoundWords.length >= 2 && lastRoundWords[0].wordText === lastRoundWords[1].wordText) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);
    console.log("numGamesWon: ", numGamesWon);

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
        dispatch(fetchFriendDetails(friendId))
        dispatch(fetchWordsBetweenFriends(friendId))
        dispatch(fetchGamesBetweenFriends(friendId))
            .then((games) => {
                console.log("games: ", games);
            })
            .catch((err) => {
                console.log("error fetching games: ", err)
            });
    }, [dispatch]);

    return (
        <div className="mainFriendDetailsDiv">
            <h1>{friend?.username}</h1>
            <div className="friendDetailsSubDiv">
                <h2>Games Played: {games?.length}</h2>
                <h2>Games Won: {numGamesWon}</h2>
            </div>
            <h2 className="pasGamesTitle">Past Games</h2>
            <Slider className="gamesForFriendSlider"  {...settings}>{gamesMapped}</Slider>
        </div>
    )

}

export default FriendDetails;
