import { ComponentProps, FC, ReactNode } from "react";

import * as styles from "./card.css";
type Props = Omit<ComponentProps<"div">, "className"> & {
  variant?: "default";
  className?: string;
  children: ReactNode;
};

const _Card: FC<Props> = ({
  variant = "default",
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={[styles.cardVariantStyle[variant], className].join(" ")}
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

_Card.displayName = "Card";

export const Card = _Card;
