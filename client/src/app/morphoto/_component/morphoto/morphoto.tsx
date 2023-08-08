import { TMorphoto } from "@/types/Morphoto";
import Image from "next/image";
import { FC } from "react";

import * as styles from "./morphoto.css";

type Props = {
  morphoto: TMorphoto;
};

const _Morphoto: FC<Props> = ({ morphoto }) => {
  return (
    <div className={styles.morphotoStyle}>
      <Image
        className={styles.morphotoImageStyle}
        src={"/assets/nijika2.png" /* morphoto.img_url */}
        fill
        alt="morphoto"
      />
    </div>
  );
};

_Morphoto.displayName = "Morphoto";

export const Morphoto = _Morphoto;
