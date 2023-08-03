"use client";

import * as styles from "./input.css";
import { InputButton, PromptCard, UploadCard } from "./_component";

const Page = () => {
  return (
    <div>
      <div className={styles.inputPageContentStyle}>
        <div className={styles.inputPageItemStyle}>
          <h2>
            Let{"'"}s start
            <br />
            morphing!
          </h2>
        </div>
        <div className={styles.inputPageItemStyle}>
          <PromptCard />
        </div>
        <div className={styles.inputPageItemStyle}>
          <UploadCard />
        </div>
        <div className={styles.inputPageItemStyle}>
          <InputButton type="submit" value={"Generate Photo"} />
        </div>
      </div>
    </div>
  );
};

export default Page;
