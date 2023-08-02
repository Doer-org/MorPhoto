import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as styles from "./input-button.css";

type Props = ComponentPropsWithoutRef<"input">;

export const InputButton = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return <input ref={ref} className={styles.uploadButtonStyle} {...props} />;
  }
);

InputButton.displayName = "InputButton";
