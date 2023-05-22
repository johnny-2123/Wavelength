import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./OpenModalButton.css";

function ModalComponent({ onClose }) {
    return (
        <div>
            <h2>This is the modal!</h2>
            <p>Click the button below to close it.</p>
            <button onClick={onClose}>Close Modal</button>
        </div>
    );
}

export default ModalComponent;
