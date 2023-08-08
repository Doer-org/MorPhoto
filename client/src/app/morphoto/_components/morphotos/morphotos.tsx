import { readAllMorphotos } from "@/api";
import { Morphoto } from "../morphoto";

import * as styles from "./morphotos.css";

export const Morphotos = async () => {
  // FIXME: ビルドエラーが出てしまう
  // const morphotos = await readAllMorphotos();
  // if (morphotos.type === "error")
  //   return new Error("Morphotoを取得できませんでした");
  // if (!morphotos.value.data) return <p>データがありません</p>;

  return (
    <div className={styles.morphotosStyle}>
      {/* {morphotos.value.data.map((morphoto) => {
        return <Morphoto key={morphoto.morphoto_id} morphoto={morphoto} />;
      })} */}

      {/* 上記が解決されれば削除 */}
      {(() => {
        const photos = [];
        for (let i = 0; i < 10; i++) {
          photos.push(
            <Morphoto
              key={i}
              morphoto={{
                morphoto_id: `${i}`,
                img_url: "/nijika2.png",
              }}
            />
          );
        }
        return photos;
      })()}
    </div>
  );
};
