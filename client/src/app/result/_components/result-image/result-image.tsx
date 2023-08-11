import { FC } from "react";
import Image from "next/image";

import * as styles from "./result-image.css";
import { getImageUrl } from "@/utils";

type Props = {
  child_id: string;
};

export const ResultImage: FC<Props> = ({ child_id }) => {
  return (
    <div className={styles.imageWrapperStyle}>
      <Image
        className={styles.imageStyle}
        src={getImageUrl(child_id)}
        fill
        alt="出力画像"
      />
    </div>
  );
};
