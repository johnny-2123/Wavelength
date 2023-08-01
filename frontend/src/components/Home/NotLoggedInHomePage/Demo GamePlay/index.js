import React, { useEffect } from "react";
import DemoRoundOneForm from "./Round One Input Form";
import DemoRoundResults from "./Round Results ";
import DemoFollowingRoundInput from "./Demo Following Round Input";
import DemoGameResults from "./Game Results";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { InViewAnimation } from "../../../Animations/InViewAnimation";
import styles from "./DemoGameplay.module.css";

const DemoGamePlay = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.25,
        },
      });
    }

    if (!inView) {
      animation.start({ x: -100, opacity: 0 });
    }
  }, [inView]);

  return (
    <div className="demoGamePlayMainDiv">
      <section className={styles.roundOne}>
        <InViewAnimation>
          <h2 className={styles.gamePlayInstructions}>Here's how it works</h2>
          <h3 className={styles.gamePlayInstructions}>
            You start with a simple task - both you and your friend enter a
            random word of your choice.
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoRoundOneForm />
        </InViewAnimation>
        <div class={styles["custom-shape-divider-bottom-1689818294"]}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className={styles["shape-fill"]}
            ></path>
          </svg>
        </div>
      </section>
      <section className={styles.roundResults}>
        <InViewAnimation>
          <h3 className={styles.gamePlayInstructions}>
            If you choose different words you'll have the chance to decide if
            your words are close enough. If you both agree, you win together. If
            not, the game continues to the next round.
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoRoundResults />
        </InViewAnimation>
        <div className={styles["custom-shape-divider-bottom-1690660452"]}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={styles["shape-fill"]}
            ></path>
          </svg>
        </div>
      </section>
      <section className={styles["followingRound"]}>
        <InViewAnimation>
          <h3 className={styles.gamePlayInstructions}>
            In the next round, you'll try to match your partner's word using the
            words from the previous round.
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoFollowingRoundInput />
        </InViewAnimation>
        <div className={styles["custom-shape-divider-bottom-1689820394"]}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className={styles["shape-fill"]}
            ></path>
          </svg>
        </div>
      </section>
      <section className={styles.gameResults}>
        <InViewAnimation>
          <h3 className={styles.gamePlayInstructions}>
            The game continues until you and your partner match words or give
            up, after which you'll be shown game results{" "}
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoGameResults />
        </InViewAnimation>
        <div class={styles["custom-shape-divider-bottom-1690662897"]}>
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={styles["shape-fill"]}
            ></path>
          </svg>
        </div>
      </section>
      <section className={styles.landingFooter}>
        <InViewAnimation>
          <h3 className={styles.gamePlayInstructions}>
            Play together, have fun, and see how your wavelengths align
          </h3>
        </InViewAnimation>
      </section>
    </div>
  );
};

export default DemoGamePlay;
