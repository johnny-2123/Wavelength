import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
<script
    src="https://kit.fontawesome.com/97726b2eee.js"
    crossorigin="anonymous"
></script>;

function ProfileButton({ user }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        closeMenu();
        dispatch(logout());
        history.push("/");
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button className="profileButton" onClick={openMenu}>
                <i className="fas fa-user-circle profileIcon" />
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <button
                                className="logoutButton"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login" onClick={closeMenu}>
                                Log In
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" onClick={closeMenu}>
                                Sign Up
                            </NavLink>
                        </li>

                    </>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
