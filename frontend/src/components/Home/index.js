import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoggedInUserHomePage from "./LoggedInHomePage";
import NotLoggedInUserHomePage from "./NotLoggedInHomePage";
import "./HomePage.css";

const HomePage = ({notify}) => {
    const sessionUser = useSelector((state) => state.session.user);

    const [loggedIn, setLoggedIn] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (sessionUser?.username) {
            setLoggedIn(true);
            setLoaded(true);
        } else {
            setLoggedIn(false);
            setLoaded(true);
        }
    }, [sessionUser]);

    return (
        <>
            {loaded && loggedIn && (
                <LoggedInUserHomePage sessionUser={sessionUser} notify={notify} />
            )}
            {loaded && !loggedIn && (
                <NotLoggedInUserHomePage />)}
        </>
    );
};

export default HomePage;
