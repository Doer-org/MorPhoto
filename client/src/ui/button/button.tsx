import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const _Button = forwardRef(
  (
    { variant, children, ...props }: Props,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        style={{
          color: "white",
          background: variant === "primary" ? "#0a088a" : "#413e3e",
          borderRadius: variant === "primary" ? "0.5rem" : "0.1rem",
          padding: "0.5rem 1rem",
          border: variant === "primary" ? "none" : "1px solid #757575",
        }}
      >
        {children}
      </button>
    );
  }
);

_Button.displayName = "Button";

export const Button = _Button;
