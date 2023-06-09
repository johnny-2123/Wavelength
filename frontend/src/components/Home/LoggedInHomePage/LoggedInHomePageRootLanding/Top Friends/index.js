import React from "react";
import "./TopFriends.css";

const TopFriends = ({ topFriends }) => {
    console.log('topFriends in top friends component', topFriends)

    const topFriendsMapped = topFriends?.map((friend) => {

        return (
            <div className="topFriendsItem">
                <h3><i class="fa-solid fa-circle-dot"></i> {friend?.username}</h3>
            </div>
        )
    })

    return (
        <div className="topFriendsMainDiv">
            <div className="topFriendsLeftDiv">
                <h1>Week's Best Friends <i className="fa-solid fa-users"></i></h1>
            </div>
            <div className="topFriendsRightDiv">
                {topFriendsMapped}
            </div>
        </div>
    )
}

export default TopFriends;
