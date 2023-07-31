import { FC, ReactNode } from "react";

import * as styles from "./card.css";
type Props = {
  variant?: "default";
  children: ReactNode;
};

const _Card: FC<Props> = ({ variant = "default", children }: Props) => {
  return (
    <div className={styles.cardVariantStyle[variant]} tabIndex={0}>
      {children}
    </div>
  );
};

_Card.displayName = "Card";

export const Card = _Card;
