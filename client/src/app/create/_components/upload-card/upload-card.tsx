"use client";

import { Card } from "@/ui";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import * as styles from "./upload-card.css";

type Props = ComponentPropsWithoutRef<"div"> & {
  renderPreview: (className?: string) => ReactNode;
  fileUploader: ReactNode;
  slider: ReactNode;
  strength: number[];
};

export const UploadCard = forwardRef<HTMLDivElement, Props>(
  ({ renderPreview, fileUploader, slider, strength }, ref) => {
    return (
      <Card>
        <div className={styles.headerStyle}>
          <span className={styles.titleStyle}>Upload Photo</span>
        </div>
        <div className={styles.contentStyle}>
          <div className={styles.itemStyle}>
            <div className={styles.imageListStyle}>
              <div className={styles.imageWrapperStyle}>
                {renderPreview(styles.imageStyle)}
              </div>
              {fileUploader}
            </div>
          </div>
          <div className={styles.itemStyle}>
            <div className={styles.sliderHeaderStyle}>
              <span className={styles.titleStyle}>Strength</span>
              <span>{Math.round(strength[0] * 100)}%</span>
            </div>
            <div className={styles.sliderInputStyle}>{slider}</div>
          </div>
        </div>
      </Card>
    );
  }
);

UploadCard.displayName = "UploadCard";
