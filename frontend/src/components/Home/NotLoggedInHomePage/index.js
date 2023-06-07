import React from "react";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../User/LoginFormModal";
import SignupFormModal from "../../User/SignUpModal";
import "./NotLoggedInHomePage.css";

const NotLoggedInUserHomePage = ({ }) => {

    return (
        <div className="notLoggedInHomePageMainDiv">
            <h1>Welcome Guest</h1>
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
            </div>
        </div>
    );
};

export default NotLoggedInUserHomePage;
