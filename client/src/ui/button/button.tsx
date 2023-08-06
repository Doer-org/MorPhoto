import {
  ComponentPropsWithRef,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";

import * as styles from "./button.css";

type Props = Omit<ComponentPropsWithRef<"button">, "className"> & {
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
};

const _Button = forwardRef(
  (
    { variant = "primary", className, children, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={[styles.buttonVariantStyle[variant], className].join(" ")}
      >
        {children}
      </button>
    );
  }
);

_Button.displayName = "Button";

export const Button = _Button;
