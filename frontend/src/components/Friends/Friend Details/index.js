import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesBetweenFriends, fetchFriendDetails, fetchWordsBetweenFriends } from "../../../store/friends";
import "./FriendDetails.css";

const FriendDetails = () => {
    const dispatch = useDispatch();
    const { friendId } = useParams();
    console.log("friendId: ", friendId);

    const friend = useSelector((state) => state.friends.currentFriend);

    const games = useSelector((state) => state.friends.gamesBetweenFriends);
    console.log("games between friends: ", games);

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
        </div>
    )

}

export default FriendDetails;
