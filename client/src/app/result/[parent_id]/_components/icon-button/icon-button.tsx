import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { Button } from "@/ui";

import * as styles from "./icon-button.css";

type Props = Omit<ComponentPropsWithoutRef<typeof Button>, "children"> & {
  renderIcon: (className?: string) => ReactNode;
  label: string;
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ renderIcon, label, ...props }, ref) => {
    return (
      <Button
        variant="secondary"
        className={styles.iconButtonStyle}
        {...props}
        ref={ref}
      >
        <div className={styles.iconButtonContentStyle}>
          {renderIcon(styles.iconButtonIconStyle)}
          <span className={styles.iconButtonLabelStyle}>{label}</span>
        </div>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
