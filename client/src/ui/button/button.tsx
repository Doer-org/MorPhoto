import {
  ComponentPropsWithRef,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";

import * as styles from "./button.css";

type Props = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const _Button = forwardRef(
  (
    { variant = "primary", children, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={styles.buttonVariantStyle[variant]}
      >
        {children}
      </button>
    );
  }
);

_Button.displayName = "Button";

export const Button = _Button;
