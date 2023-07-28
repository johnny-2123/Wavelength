import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const InViewAnimation = ({ children }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const animation = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.25,
        },
      });
      setHasAnimated(true);
    }
  }, [inView, animation, hasAnimated]);

  return (
    <motion.div initial={{ opacity: 0, x: -100 }} animate={animation} ref={ref}>
      {children}
    </motion.div>
  );
};
