import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./NotLoggedInHomePage.css";

const NotLoggedInUserHomePage = ({ }) => {

    return (
        <div className="homePageLoggedInMainDiv">
            <h1>Welcome Guest</h1>
            <div>

            </div>
        </div>
    );
};

export default NotLoggedInUserHomePage;
