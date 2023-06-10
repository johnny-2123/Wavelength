import React from "react";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../User/LoginFormModal";
import SignupFormModal from "../../User/SignUpModal";
import DemoGamePlay from "./Demo GamePlay";
import "./NotLoggedInHomePage.css";

const NotLoggedInUserHomePage = ({ }) => {

    return (
        <div className="notLoggedInHomePageMainDiv">
            <h1 id="notLoggedInHomePage">Wavelength</h1>
            <h2 id="notLoggedInHomePage">Challenge your mind in a game of creativity and connection. Join now and see how well you sync with your friends.</h2>
            <div className="notLoggedInHomePageSubDiv">
                <div className="notLoggedInHomePageButtons">
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
                <DemoGamePlay />

            </div>
        </div>
    );
};

export default NotLoggedInUserHomePage;
