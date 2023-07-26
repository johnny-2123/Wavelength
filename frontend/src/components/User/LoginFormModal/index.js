import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/modal";
import styles from "./LoginModal.module.css";
import { motion } from "framer-motion";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: 0,
        },
        visible: {
            y: 0,
            transition: {
                type: "spring",
                delay: 0,
                duration: .1,
                stiffness: 250,
                damping: 30,
            },
            opacity: 1,
        },
        exit: {
            y: "-100vh",
            transition: {
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div className={styles.loginModalDiv}

            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h1 className={styles.loginModalTitle}>Log In</h1>
            <form onSubmit={handleSubmit} className={styles.loginModalForm}>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p>{errors.credential}</p>
                )}
                <button type="submit">Log In</button>
            </form>
        </motion.div>
    );
}

export default LoginFormModal;
