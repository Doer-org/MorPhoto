"use client";

import { Card } from "@/ui";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  forwardRef,
  useState,
} from "react";

import { Slider } from "../slider";

import * as styles from "./upload-card.css";

type Inputs = {
  prompt: string;
  image: File;
  strength: number[];
};

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
        <div className={styles.uploadCardHeaderStyle}>
          <span className={styles.uploadCardTitleStyle}>Upload Photo</span>
        </div>
        <div className={styles.uploadCardContentStyle}>
          <div className={styles.uploadCardItemStyle}>
            <div className={styles.uploadCardImageListStyle}>
              <div className={styles.uploadCardImageWrapperStyle}>
                {renderPreview(styles.uploadCardImageStyle)}
              </div>
              {fileUploader}
            </div>
          </div>
          <div className={styles.uploadCardItemStyle}>
            <div className={styles.uploadCardSliderHeaderStyle}>
              <span className={styles.uploadCardTitleStyle}>Strength</span>
              <span>{Math.round(strength[0] * 100)}%</span>
            </div>
            <div className={styles.uploadCardSliderInputStyle}>{slider}</div>
          </div>
        </div>
      </Card>
    );
  }
);

UploadCard.displayName = "UploadCard";
