import React, { useState } from "react";
import { NavLink, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import AddFriend from "./AddFriendForm";
import AcceptedFriends from "./Accepted Friends";
import PendingFriends from "./Pending Friends";
import FriendDetails from "./Friend Details";
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
            <nav className="friendsNavBar">
                <div className='friendNavLinks'>
                    <NavLink to={`${url}/accepted`} activeClassName="active-link" onClick={() => handleTabClick("accepted")}>
                        Accepted
                    </NavLink>
                    <NavLink to={`${url}/pending`} activeClassName="active-link" onClick={() => handleTabClick("pending")}>
                        Pending
                    </NavLink>
                </div>
            </nav>
            <div className="openFriendModalDiv">
                <OpenModalButton modalComponent={<AddFriend />} buttonText={<i className="fa-solid fa-user-plus" />} />
            </div>
            <Switch>
                <Route path={`${path}/accepted`}>
                    <AcceptedFriends friends={friends} sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
                <Route path={`${path}/pending`}>
                    <PendingFriends friends={friends} sessionUser={sessionUser} />
                </Route>
                <Route path={`${path}/:friendId`}>
                    <FriendDetails sessionUser={sessionUser} sendMessage={sendMessage} />
                </Route>
            </Switch>
        </div>
    );
};

export default FriendsList;
