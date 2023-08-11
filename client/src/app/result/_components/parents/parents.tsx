import { FC } from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils";

import * as styles from "./parents.css";

type Props = {
  parent_id: string;
};

export const Parent: FC<Props> = ({ parent_id }) => {
  return (
    <div className={styles.imageListStyle}>
      <div key={parent_id} className={styles.imageWrapperStyle}>
        <Image
          className={styles.imageStyle}
          src={getImageUrl(parent_id)}
          fill
          alt="出力画像"
        />
      </div>
    </div>
  );
};
