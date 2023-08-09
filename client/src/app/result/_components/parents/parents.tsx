import { FC } from "react";
import { readMorphoto } from "@/api";
import Image from "next/image";

import * as styles from "./parents.css";

type Props = {
  morphoto_id: string;
};

export const Parents: FC<Props> = async ({ morphoto_id }) => {
  const morphoto = await readMorphoto(morphoto_id);
  if (morphoto.type === "error") return <p>データの取得に失敗しました</p>;

  const parent_id = morphoto.value.data.parent_id;
  if (!parent_id) return <></>;
  const parent = await readMorphoto(parent_id);
  if (parent.type === "error") return <p>データの取得に失敗しました</p>;

  return (
    <div className={styles.imageListStyle}>
      {[parent].map((p) => {
        return (
          <div
            key={p.value.data.parent_id}
            className={styles.imageWrapperStyle}
          >
            <Image
              className={styles.imageStyle}
              src={p.value.data.parent_id}
              fill
              alt="出力画像"
            />
          </div>
        );
      })}
    </div>
  );
};
