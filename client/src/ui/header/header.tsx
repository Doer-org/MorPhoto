import { ComponentPropsWithoutRef, FC, ReactNode, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"header"> & {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
};

const _Header = forwardRef<HTMLElement, Props>(
  ({ leftChildren, rightChildren, ...props }, ref) => {
    return (
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
        {...props}
        ref={ref}
      >
        {/* left */}
        <div style={{ float: "left" }}>{leftChildren}</div>
        {/* right */}
        <div style={{ float: "right" }}>{rightChildren}</div>
      </header>
    );
  }
);

_Header.displayName = "Header";

export const Header = _Header;
