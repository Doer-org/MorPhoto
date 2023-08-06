"use client";

import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";

import * as ReactSlider from "@radix-ui/react-slider";
import * as styles from "./slider.css";

type Props = Omit<
  ComponentPropsWithRef<typeof ReactSlider.Root>,
  "min" | "max" | "step" | "defaultValue" | "className"
> & {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  className?: string;
};

const _Slider = forwardRef(
  (
    {
      min = 0,
      max = 1,
      step = 0.01,
      defaultValue = [0.5],
      className,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLSpanElement>
  ) => {
    return (
      <ReactSlider.Root
        ref={ref}
        className={[styles.sliderRoot, className].join(" ")}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        {...props}
      >
        <ReactSlider.Track className={styles.sliderTrack}>
          <ReactSlider.Range className={styles.sliderRange} />
        </ReactSlider.Track>
        <ReactSlider.Thumb className={styles.sliderThumb} aria-label="Volume" />
      </ReactSlider.Root>
    );
  }
);

_Slider.displayName = "Slider";

export const Slider = _Slider;
