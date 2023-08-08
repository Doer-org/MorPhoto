import { readAllMorphotos } from "@/api";
import Image from "next/image";

import * as styles from "./morphotos.css";

export const Morphotos = async () => {
  const morphotos = await readAllMorphotos();
  if (morphotos.type === "error")
    return new Error("Morphotoを取得できませんでした");
  if (!morphotos.value.data) return <p>データがありません</p>;

  return (
    <div className={styles.morphotosStyle}>
      {morphotos.value.data.map((morphoto) => {
        return (
          <div key={morphoto.morphoto_id} className={styles.morphotoStyle}>
            <Image
              className={styles.morphotoImageStyle}
              src={"/assets/nijika2.png" /* morphoto.img_url */}
              fill
              alt="morphoto"
            />
          </div>
        );
      })}
    </div>
  );
};
