import React from "react";
import styles from "./DemoRoundResults.module.css";

const DemoRoundResults = () => {
  return (
    <div className={styles.DemoRoundResults}>
      <h2 className={styles.demoRoundResults}>Round Results</h2>
      <div className={styles.demoRoundResultsTop}>
        <div>
          <h5 className={styles.demoRoundResults}>{"partner"}</h5>
          <h6 className={styles.demoRoundResults}>{"taylor swift"}</h6>
        </div>
        <div>
          <h5 className={styles.demoRoundResults}>You</h5>
          <h6 className={`${styles.demoRoundResults} ${styles.demoUserWord}`}>
            {"bowser"}
          </h6>
        </div>
      </div>
      <div>
        <p>{`5 seconds left`}</p>
        <button>Close Enough</button>
        <button>Next Round</button>
      </div>
    </div>
  );
};

export default DemoRoundResults;
