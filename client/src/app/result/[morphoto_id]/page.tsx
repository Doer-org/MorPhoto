"use client";

import { Button } from "@/ui";
import {
  CopyButton,
  MisskeyShareButton,
  Parent,
  CreateLink,
  ResultImage,
  SaveLink,
  TwitterShareButton,
  Modal,
} from "../_components";
import { useEffect, useState } from "react";
import { TMorphoto } from "@/types/Morphoto";
import { createInference, readMorphoto } from "@/api";
import { env } from "@/constants";

import * as styles from "../result.css";

export default function ResultPage({
  params: { morphoto_id },
  searchParams: { prompt, strength },
}: {
  params: { morphoto_id: string };
  searchParams: { prompt: string; strength: string };
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [morphoto, setMorphoto] = useState<TMorphoto | null>(null);

  useEffect(() => {
    setModalOpen(true);
    createInference(morphoto_id, {
      prompt: prompt,
      strength: Number(strength),
      is_mock: true,
    })
      .then((result) => {
        if (result.type === "error")
          return <p>データの読み込みに失敗しました</p>;
        if (!result.value.data) return <p>データがありません</p>;
        setMorphoto(result.value.data);
        console.log(result.value.data.parent_id);
      })
      .catch((err) => {
        console.error("何らかのエラーが発生しました", err);
      });

    readMorphoto(morphoto_id)
      .then((result) => {
        if (result.type === "error")
          return <p>データの読み込みに失敗しました</p>;
        if (!result.value.data) return <p>データがありません</p>;
        setMorphoto(result.value.data);
        console.log(result.value.data.parent_id);
      })
      .catch((err) => {
        console.error("何らかのエラーが発生しました", err);
      });
  }, []);

  return (
    <div className={styles.resultStyle}>
      <Modal
        trigger={<Button variant="primary">View Result</Button>}
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      >
        <div className={styles.resultModalContentStyle}>
          <div className={styles.resultModalItemStyle}>
            {morphoto && <ResultImage child_id={morphoto.child_id} />}
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultButtonGroupStyle}>
              <CreateLink />
              {morphoto && <SaveLink child_id={morphoto.child_id} />}
            </div>
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultCardStyle}>
              <div className={styles.resultCardItemStyle}>
                {morphoto && (
                  <p className={styles.resultPromptStyle}>{morphoto.prompt}</p>
                )}
              </div>
              <div className={styles.resultCardItemStyle}>
                {morphoto && <CopyButton prompt={morphoto.prompt} />}
              </div>
              <div className={styles.resultCardItemStyle}>
                {morphoto && (
                  <div className={styles.resultSnsListStyle}>
                    <TwitterShareButton
                      text="MorPhotoで画像を生成したよ！"
                      hashtags={["morphoto"]}
                      url={`${env.CLIENT_URL}/result/${morphoto.parent_id}`}
                    />
                    <MisskeyShareButton
                      title="MorPhotoで画像を生成したよ！"
                      text="#morphoto"
                      url={`${env.CLIENT_URL}/result/${morphoto.parent_id}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultCardStyle}>
              <div className={styles.resultCardItemStyle}>
                <span className={styles.resultCardTitleStyle}>Before</span>
              </div>
              <div className={styles.resultCardItemStyle}>
                {morphoto && <Parent parent_id={morphoto.parent_id} />}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
