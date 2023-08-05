import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import { Button } from "@/ui";

import * as styles from "./icon-button.css";

type Props = Omit<ComponentPropsWithoutRef<typeof Button>, "children"> & {
  Icon: ReactNode;
  label: string;
};

export const IconButton = forwardRef<HTMLInputElement, Props>(
  ({ Icon, label }, ref) => {
    return (
      <Button variant="secondary" className={styles.iconButtonStyle}>
        <div className={styles.iconButtonContentStyle}>
          {Icon}
          <span className={styles.iconButtonLabelStyle}>{label}</span>
        </div>
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
