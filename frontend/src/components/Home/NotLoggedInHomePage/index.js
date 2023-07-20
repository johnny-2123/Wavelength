import React from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../User/LoginFormModal";
import SignupFormModal from "../../User/SignUpModal";
import DemoGamePlay from "./Demo GamePlay";
import { fetchDemoLogin } from "../../../store/session";
import Landing from "./Landing";
import "./NotLoggedInHomePage.css";

const NotLoggedInUserHomePage = ({}) => {
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    return dispatch(fetchDemoLogin())
      .then((user) => {})
      .catch(async (res) => {
        const data = await res.json();
      });
  };

  return (
    <>
      {/* <Landing /> */}
      <div className="notLoggedInHomePageMainDiv">
        <div className="landingPageTopSection">
          <h1 id="notLoggedInHomePage">Wavelength</h1>
          <i class="fa-solid fa-wave-square"></i>
          <h2 id="notLoggedInHomePage">
            Challenge your mind in a game of creativity and connection.
          </h2>
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
              className="notLoggedInHomePageDemoButton"
            >
              Demo Login
            </button>
          </div>
          <div class="custom-shape-divider-bottom-1689819368">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                class="shape-fill"
              ></path>
            </svg>
          </div>
        </div>
        <DemoGamePlay />
      </div>
    </>
  );
};

export default NotLoggedInUserHomePage;
