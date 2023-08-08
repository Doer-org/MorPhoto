import { FC } from "react";
import Image from "next/image";

import * as styles from "./result-image.css";
import { readMorphoto } from "@/api";

type Props = {
  morphoto_id?: string;
};

export const ResultImage: FC<Props> = async ({ morphoto_id }) => {
  if (!morphoto_id) return <p>出力画像がありません</p>;

  const morphoto = await readMorphoto(morphoto_id);
  if (morphoto.type === "error") return <p>出力画像の取得に失敗しました</p>;

  return (
    <div className={styles.imageWrapperStyle}>
      <Image
        className={styles.imageStyle}
        src={morphoto.value.data.img_url}
        fill
        alt="出力画像"
        priority
      />
    </div>
  );
};
