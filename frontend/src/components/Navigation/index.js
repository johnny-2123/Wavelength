import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWaveform, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);



    const handleSearch = (e) => {
        e.preventDefault();
        toast.info('Search feauture coming soon', {
            hideProgressBar: true,
        });
    }

    return (
        <ul className="navigationUl">
            <li>
                <NavLink to="/">
                    <FontAwesomeIcon icon={faFileWaveform} />
                </NavLink>
            </li>
            {sessionUser?.id && <li className="searchBarDiv">
                <div
                    onClick={handleSearch}
                    className="searchBar">
                    <input type="text" placeholder="Search" />
                    <button>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </li>}
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
