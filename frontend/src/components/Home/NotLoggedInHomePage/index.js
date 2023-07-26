import React from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../User/LoginFormModal";
import SignupFormModal from "../../User/SignUpModal";
import DemoGamePlay from "./Demo GamePlay";
import { fetchDemoLogin } from "../../../store/session";
import Landing from "./Landing";
import WavelengthLines from "../../../images/wavelength_lines.svg"
import { easeIn, motion } from "framer-motion"
import blob3 from "../../../images/blob3.png"
import line2 from "../../../images/line.png"
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
      <div className="notLoggedInHomePageMainDiv"
      >
        <motion.div className="landingPageTopSection"
        >
          <img src={line2} className="blobDots" />
          <motion.h1 id="notLoggedInHomePage"
          >Wavelength</motion.h1>
          <motion.i class="fa-solid fa-wave-square"
           animate={{color: ['#334075', '#D85F56'], }}
            transition={{duration:4 , repeat: Infinity, repeatType: "mirror" }}
          ></motion.i>
          <motion.h2 id="notLoggedInHomePage"
          >
            Challenge your mind in a game of creativity and connection.
          </motion.h2>
          <motion.div className="notLoggedInHomePageButtons"
          >
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
          </motion.div>
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
        </motion.div>
        <DemoGamePlay />
      </div>
    </>
  );
};

export default NotLoggedInUserHomePage;
