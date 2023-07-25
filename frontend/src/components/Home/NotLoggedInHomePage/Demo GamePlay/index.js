import React from "react";
import DemoRoundOneForm from "./Round One Input Form";
import DemoRoundResults from "./Round Results ";
import DemoFollowingRoundInput from "./Demo Following Round Input";
import DemoGameResults from "./Game Results";
import "./DemoGameplay.css";

const DemoGamePlay = () => {
  return (
    <div className="demoGamePlayMainDiv">
      <section className="roundOne">
        <h3 className="gamePlayInstructions">
          <h2>Here's how it works</h2>
          You start with a simple task - both you and your friend enter a random
          word of your choice.
        </h3>
        <DemoRoundOneForm />
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
        <h3 className="gamePlayInstructions">
          If you choose different words you'll have the chance to decide if your
          words are close enough. If you both agree, you win together. If not,
          the game continues to the next round.
        </h3>
        <DemoRoundResults />
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
        <h3 className="gamePlayInstructions">
          In the next round, you'll try to match your partner's word using the
          words from the previous round.
        </h3>
        <DemoFollowingRoundInput />
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
        <h3 className="gamePlayInstructions">
          The game continues until you and your partner match words or give up,
          after which you'll be shown game results{" "}
        </h3>
        <DemoGameResults />
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
        <h3 className="gamePlayInstructions">
          Play together, have fun, and see how your wavelengths align
        </h3>
      </section>
    </div>
  );
};

export default DemoGamePlay;