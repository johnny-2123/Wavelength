import React, { useState } from "react";
import { NavLink, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import AddFriend from "./AddFriendForm";
import AcceptedFriends from "./Accepted Friends";
import PendingFriends from "./Pending Friends";
import "./FriendsList.css";


const FriendsList = ({ friends, sessionUser, sendMessage }) => {
    const { path, url } = useRouteMatch();
    console.log("path", path);
    const [activeTab, setActiveTab] = useState("accepted");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="friendsList">
            <div className="openFriendModalDiv">
                <OpenModalButton modalComponent={<AddFriend />} buttonText={<i className="fa-solid fa-user-plus" />} />
            </div>

            <nav className="friendsNavBar">
                <NavLink to={`${url}/accepted`} activeClassName="active-link" onClick={() => handleTabClick("accepted")}>
                    Accepted Friends
                </NavLink>
                <NavLink to={`${url}/pending`} activeClassName="active-link" onClick={() => handleTabClick("pending")}>
                    Pending Friends
                </NavLink>
            </nav>

            <Switch>
                <Route path={`${path}/accepted`}>
                    <AcceptedFriends friends={friends} sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
                <Route path={`${path}/pending`}>
                    <PendingFriends friends={friends} sessionUser={sessionUser} />
                </Route>
            </Switch>
        </div>
    );
};

export default FriendsList;
