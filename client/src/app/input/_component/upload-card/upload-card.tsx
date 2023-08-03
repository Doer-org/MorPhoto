import { ComponentPropsWithRef, forwardRef } from "react";
import Image from "next/image";
import { Card, Slider } from "@/ui";

import * as styles from "./upload-card.css";

type Props = Omit<ComponentPropsWithRef<typeof Card>, "children">;

export const UploadCard = forwardRef<HTMLSpanElement, Props>(
  ({ ...props }, ref) => {
    return (
      <Card {...props}>
        <div className={styles.uploadCardStyle}>
          <div className={styles.uploadCardHeaderStyle}>
            <span className={styles.uploadCardTitleStyle}>Upload Photo</span>
          </div>
          <div className={styles.uploadCardContentStyle}>
            <div className={styles.uploadCardItemStyle}>
              <div className={styles.uploadCardImageStyle}>
                <Image
                  src={"/assets/nijika1.png"}
                  width={120}
                  height={120}
                  alt="入力画像"
                />
              </div>
            </div>
            <div className={styles.uploadCardItemStyle}>
              <div className={styles.uploadCardSliderHeaderStyle}>
                <span className={styles.uploadCardTitleStyle}>Strength</span>
                <span>50%</span>
              </div>
              <div className={styles.uploadCardSliderInputStyle}>
                <Slider ref={ref} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

UploadCard.displayName = "PromptCard";
