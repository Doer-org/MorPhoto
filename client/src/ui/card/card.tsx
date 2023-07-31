import { FC, ReactNode } from "react";

import * as styles from "./card.css";
type Props = {
  variant?: "default";
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const _Card: FC<Props> = ({
  variant = "default",
  children,
  ...props
}: Props) => {
  return (
    <div className={styles.cardVariantStyle[variant]} tabIndex={0} {...props}>
      {children}
    </div>
  );
};

_Card.displayName = "Card";

export const Card = _Card;
