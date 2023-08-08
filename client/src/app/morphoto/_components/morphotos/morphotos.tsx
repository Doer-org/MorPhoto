import { readAllMorphotos } from "@/api";
import { Morphoto } from "../morphoto";

import * as styles from "./morphotos.css";

export const Morphotos = async () => {
  const morphotos = await readAllMorphotos();
  if (morphotos.type === "error")
    return new Error("Morphotoを取得できませんでした");
  if (!morphotos.value.data) return <p>データがありません</p>;

  return (
    <div className={styles.morphotosStyle}>
      {morphotos.value.data.map((morphoto) => {
        return <Morphoto key={morphoto.morphoto_id} morphoto={morphoto} />;
      })}
    </div>
  );
};
