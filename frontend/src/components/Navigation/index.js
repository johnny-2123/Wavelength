import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileWaveform,
  faSearch,
  faLinkedin,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
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
          <FontAwesomeIcon icon={faFileWaveform} />
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
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/johnny-2123/Wavelength" target="_blank">
            <i class="fa-brands fa-github"></i>
          </a>
          <a
            href="https://wellfound.com/u/johnny-edgar-avila"
            target="_blank"
            className="wellFound"
          >
            W:
          </a>
        </li>
      )}
      {isLoaded && sessionUser?.id && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
