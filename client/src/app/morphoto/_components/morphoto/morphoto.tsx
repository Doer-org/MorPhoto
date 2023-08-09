import { TMorphoto } from "@/types/Morphoto";
import Image from "next/image";
import { FC } from "react";

import * as styles from "./morphoto.css";

type Props = {
  morphoto: TMorphoto;
};

export const Morphoto: FC<Props> = ({ morphoto }) => {
  return (
    <div className={styles.morphotoStyle}>
      <Image
        className={styles.morphotoImageStyle}
        src={morphoto.img_url}
        fill
        alt="morphoto"
      />
    </div>
  );
};
