import React from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../User/LoginFormModal";
import SignupFormModal from "../../User/SignUpModal";
import DemoGamePlay from "./Demo GamePlay";
import { fetchDemoLogin } from "../../../store/session";
import "./NotLoggedInHomePage.css";

const NotLoggedInUserHomePage = ({ }) => {
    const dispatch = useDispatch();

    const handleDemoLogin = () => {
        return dispatch(fetchDemoLogin())
            .then((user) => {
            })
            .catch(async (res) => {
                const data = await res.json();
            });
    };




    return (
        <div className="notLoggedInHomePageMainDiv">
            <div className="landingPageTopSection">
                <h1 id="notLoggedInHomePage">Wavelength</h1>
                <i class="fa-solid fa-wave-square"></i>
                <h2 id="notLoggedInHomePage">Challenge your mind in a game of creativity and connection. Join now and see how well you sync with your friends.</h2>
            </div>
            <div className="notLoggedInHomePageSubDiv">
                <div className="notLoggedInHomePageButtons">
                    <div>
                        <OpenModalButton
                            buttonText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalButton
                            buttonText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                    <button
                        onClick={handleDemoLogin}
                        className="notLoggedInHomePageDemoButton">Demo Login</button>
                </div>
                <DemoGamePlay />

            </div>
        </div>
    );
};

export default NotLoggedInUserHomePage;
