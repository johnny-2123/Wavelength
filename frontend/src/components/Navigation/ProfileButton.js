import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../User/LoginFormModal";
import SignupFormModal from "../User/SignUpModal";
import EditUser from "./EditUser";
import { motion, AnimatePresence } from "framer-motion";
import "./Navigation.css";

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
        {user && (
          <img
            id="userProfilePic"
            src={
              user?.imageUrl ||
              "https://res.cloudinary.com/dkul3ouvi/image/upload/v1688073928/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e_iwci96.jpg"
            }
          ></img>
        )}
      </button>
      <motion.ul
        key={"profile-dropdown"}
        className={ulClassName}
        ref={ulRef}
        initial={{ opacity: 0, scale: 0, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, x: 100, transition: { duration: 0.1 } }}
        transition={{ duration: 0.2 }}
      >
        {user ? (
          <>
            <OpenModalButton
              buttonText="Edit Profile"
              modalComponent={
                <EditUser user={user} handleLogout={handleLogout} />
              }
            />
            <li>
              <button className="logoutButton" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </motion.ul>
    </>
  );
}

export default ProfileButton;
