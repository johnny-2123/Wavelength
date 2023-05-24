import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoggedInUserHomePage from "./LoggedInHomePage";
import "./HomePage.css";

const HomePage = () => {
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
                <>
                    <LoggedInUserHomePage sessionUser={sessionUser} />
                </>
            )}
            {loaded && !loggedIn && (
                <h1>Welcome Guest</h1>)}
        </>
    );
};

export default HomePage;
