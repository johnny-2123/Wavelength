import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DropInAnimation = ({ children }) => {
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
        duration: 0.1,
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
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate={"visible"}
        exit="exit"
        variants={dropIn}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default DropInAnimation;
