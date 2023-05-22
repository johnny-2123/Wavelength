import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
                <h1>Welcome User</h1>
            )}
            {loaded && !loggedIn && (
                <h1>Welcome Guest</h1>)}
        </>
    );
};

export default HomePage;
