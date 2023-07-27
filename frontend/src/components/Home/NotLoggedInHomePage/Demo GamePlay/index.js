import React, {useEffect} from "react";
import DemoRoundOneForm from "./Round One Input Form";
import DemoRoundResults from "./Round Results ";
import DemoFollowingRoundInput from "./Demo Following Round Input";
import DemoGameResults from "./Game Results";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {InViewAnimation} from "../../../Animations/InViewAnimation";
import "./DemoGameplay.css";

const DemoGamePlay = () => {
  const { ref, inView } = useInView({ threshold: 0.1});
  const animation = useAnimation();

  useEffect(() => {
    console.log('component in view', inView)
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
      animation.start({x: -100, opacity: 0 })
    }

  }, [inView]);

  return (
    <div className="demoGamePlayMainDiv">
      <section className="roundOne"
      >
        <InViewAnimation>
        <h3 className="gamePlayInstructions"
        >
          <h2>Here's how it works</h2>
          You start with a simple task - both you and your friend enter a random
          word of your choice.
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoRoundOneForm />
        </InViewAnimation>
        <div class="custom-shape-divider-bottom-1689818294">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <section className="roundResults">
        <InViewAnimation>
        <h3 className="gamePlayInstructions">
          If you choose different words you'll have the chance to decide if your
          words are close enough. If you both agree, you win together. If not,
          the game continues to the next round.
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoRoundResults />
        </InViewAnimation>
        <div class="custom-shape-divider-bottom-1689819039">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <section className="followingRound">
        <InViewAnimation>
          <h3 className="gamePlayInstructions">
          In the next round, you'll try to match your partner's word using the
          words from the previous round.
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoFollowingRoundInput />
        </InViewAnimation>
        <div class="custom-shape-divider-bottom-1689820394">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <section className="gameResults">
        <InViewAnimation>
        <h3 className="gamePlayInstructions">
          The game continues until you and your partner match words or give up,
          after which you'll be shown game results{" "}
          </h3>
        </InViewAnimation>
        <InViewAnimation>
          <DemoGameResults />
        </InViewAnimation>
        <div class="custom-shape-divider-bottom-1689820750">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <section className="landingFooter">
        <InViewAnimation>
        <h3 className="gamePlayInstructions">
          Play together, have fun, and see how your wavelengths align
        </h3>
        </InViewAnimation>
      </section>
    </div>
  );
};

export default DemoGamePlay;
