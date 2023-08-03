import { Card } from "@/ui";
import { ComponentPropsWithRef, forwardRef } from "react";

import * as styles from "./prompt-card.css";

type Props = Omit<ComponentPropsWithRef<typeof Card>, "children">;

export const PromptCard = forwardRef<HTMLTextAreaElement, Props>(
  ({ ...props }, ref) => {
    return (
      <Card {...props}>
        <div className={styles.promptCardStyle}>
          <div className={styles.promptCardHeaderStyle}>
            <span className={styles.promptCardTitleStyle}>Prompt</span>
          </div>
          <div className={styles.promptCardContentStyle}>
            <textarea
              ref={ref}
              className={styles.promptCardInputStyle}
              name=""
              id=""
            ></textarea>
          </div>
        </div>
      </Card>
    );
  }
);

PromptCard.displayName = "PromptCard";
