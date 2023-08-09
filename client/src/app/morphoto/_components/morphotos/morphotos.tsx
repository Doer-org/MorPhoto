"use client";

import { useEffect, useState } from "react"; // 必要に応じて追加
import { Result, readAllMorphotos } from "@/api";
import { Morphoto } from "../morphoto";

import * as styles from "./morphotos.css";
import { ResponseError } from "@/api/core";

// FIXME: asyncを使うとなぜかビルドがコケる
export const Morphotos = () => {
  const [morphotos, setMorphotos] = useState<Result<
    {
      data: ({
        morphoto_id: string;
        img_url: string;
      } & {
        parent_id?: string | undefined;
      })[];
    } & {},
    ResponseError
  > | null>(null); // 状態を管理

  useEffect(() => {
    // 非同期処理を実行
    readAllMorphotos()
      .then((result) => {
        setMorphotos(result);
      })
      .catch((error) => {
        console.error("ここには到達しないはず", error);
      });
  }, []); // コンポーネントがマウントされた時に実行

  if (morphotos === null) {
    return <p>データを読み込んでいます...</p>;
  }

  if (morphotos.type === "error") {
    return <p>データの取得に失敗しました</p>;
  }

  if (!morphotos.value.data) {
    return <p>データがありません</p>;
  }

  return (
    <div className={styles.morphotosStyle}>
      {morphotos.value.data.map((morphoto) => (
        <Morphoto key={morphoto.morphoto_id} morphoto={morphoto} />
      ))}
    </div>
  );
};
