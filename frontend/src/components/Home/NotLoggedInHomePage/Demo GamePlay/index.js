import React from "react";
import DemoRoundOneForm from "./Round One Input Form";
import DemoRoundResults from "./Round Results ";
import DemoFollowingRoundInput from './Demo Following Round Input'
import DemoGameResults from "./Game Results";
import "./DemoGameplay.css";

const DemoGamePlay = () => {

    return (
        <div className="demoGamePlayMainDiv">
            <h2>Here's how it works</h2>
            <h3 className="gamePlayInstructions">You start with a simple task - both you and your friend enter a random word of your choice.</h3>
            <DemoRoundOneForm />
            <h3 className="gamePlayInstructions">The magic unfolds when you both choose the same word - instant victory. If you choose different words you'll have the chance to decide if your words are close enough. If you both agree, you win together. If not, the game continues to the next round.</h3>
            <DemoRoundResults />
            <h3 className="gamePlayInstructions">In the next round, you'll try to match your partner's word using the words from the previous round.</h3>
            <DemoFollowingRoundInput />
            <h3 className="gamePlayInstructions">The game continues until you and your partner match words or give up, after which you'll be shown game results </h3>
            <DemoGameResults />
            <h3 className="gamePlayInstructions">Play together, have fun, and see how your wavelengths align</h3>
        </div>
    )
}

export default DemoGamePlay;
