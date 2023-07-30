import { FC, ReactNode } from "react";

type Props = {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
};

const _Header: FC<Props> = ({ leftChildren, rightChildren }: Props) => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "#aaaaaa",
      }}
    >
      {/* left */}
      <div style={{ float: "left" }}>{leftChildren}</div>
      {/* right */}
      <div style={{ float: "right" }}>{rightChildren}</div>
    </header>
  );
};

_Header.displayName = "Header";

export const Header = _Header;
