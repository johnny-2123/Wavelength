import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import LoginFormModal from "../../User/LoginFormModal";
import SignupFormModal from "../../User/SignUpModal";
import DemoGamePlay from "./Demo GamePlay";
import { fetchDemoLogin } from "../../../store/session";
import { AnimatePresence, motion } from "framer-motion";
import circle_orange from "../../../images/circle_orange.png";
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

  const placeholderText = ["water", "ocean", "surfing"];
  const wordTwo = ["beach", "waves", "surfing"];
  const [state, setState] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setState((s) => s + 1);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const placeholder = placeholderText[state % placeholderText.length];
  const wordTwoPlaceholder = wordTwo[state % wordTwo.length];

  return (
    <>
      {/* <Landing /> */}
      <div className="notLoggedInHomePageMainDiv">
        <motion.div className="landingPageTopSection">
          <AnimatePresence mode="wait">
            <motion.div
              key={"landingTopLeft"}
              className="landingTopLeft"
              style={{ backgroundImage: `url(${circle_orange})` }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                type: "spring",
                bounce: 0.25,
              }}
            >
              <motion.h1 id="notLoggedInHomePage">Wavelength</motion.h1>
              <motion.h2 id="notLoggedInHomePage">
                Challenge your mind in a game of creativity and connection.
              </motion.h2>
              <motion.div className="notLoggedInHomePageButtons">
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
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="landingTopRight"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              type: "spring",
              bounce: 0.25,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.h3 className="landingWord" key={placeholder}>
                {placeholder}
              </motion.h3>
            </AnimatePresence>
            <motion.i
              class="fa-solid fa-wave-square"
              animate={{ color: ["#334075", "#D85F56"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            ></motion.i>
            <AnimatePresence mode="wait">
              <motion.h3 className="landingWord" key={wordTwoPlaceholder}>
                {wordTwoPlaceholder}
              </motion.h3>
            </AnimatePresence>
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
