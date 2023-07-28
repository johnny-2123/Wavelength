import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileWaveform,
  faSearch,
  faLinkedin,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const handleSearch = (e) => {
    e.preventDefault();
    toast.info("Search feature coming soon", {
      hideProgressBar: true,
    });
  };

  return (
    <ul className="navigationUl">
      <li>
        <NavLink to="/">
          <FontAwesomeIcon icon={faWaveSquare} />
        </NavLink>
      </li>
      {sessionUser?.id && (
        <li className="searchBarDiv">
          <div onClick={handleSearch} className="searchBar">
            <input type="text" placeholder="Search" />
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </li>
      )}
      {!sessionUser?.id && (
        <li className="aboutLinks">
          <a
            href="https://www.linkedin.com/in/johnny-avila-0512aa164/"
            target="_blank"
            rel="noreferrer"
          >
            <motion.i
              class="fa-brands fa-linkedin"
              whileHover={{ scale: 1.15, ease: "easeInOut" }}
              whileTap={{ color: "#7E87AE" }}
            ></motion.i>
          </a>
          <a
            href="https://github.com/johnny-2123/Wavelength"
            target="_blank"
            rel="noreferrer"
          >
            <motion.i
              class="fa-brands fa-github"
              whileHover={{ scale: 1.15, ease: "easeInOut" }}
              whileTap={{ color: "#7E87AE" }}
            ></motion.i>
          </a>
          <motion.a
            href="https://wellfound.com/u/johnny-edgar-avila"
            target="_blank"
            className="wellFound"
            rel="noreferrer"
            whileHover={{ scale: 1.15, ease: "easeInOut" }}
            whileTap={{ color: "#7E87AE" }}
          >
            W:
          </motion.a>
        </li>
      )}
      {isLoaded && sessionUser?.id && (
        <li>
          <AnimatePresence mode="wait">
            <ProfileButton user={sessionUser} />
          </AnimatePresence>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
