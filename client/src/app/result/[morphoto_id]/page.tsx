"use client";

import { Button } from "@/ui";
import {
  CopyButton,
  MisskeyShareButton,
  Parents,
  CreateLink,
  ResultImage,
  SaveLink,
  TwitterShareButton,
  Modal,
} from "./_components";
import { Suspense, useEffect, useState } from "react";
import { env } from "@/constants";

import * as styles from "./result.css";

export default function ResultPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { morphoto_id?: string; prompt?: string };
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setModalOpen(true);
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
            <Suspense>
              <ResultImage morphoto_id={searchParams.morphoto_id} />
            </Suspense>
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultButtonGroupStyle}>
              <CreateLink />
              {searchParams.morphoto_id && (
                <>
                  <Suspense>
                    <SaveLink morphoto_id={searchParams.morphoto_id} />
                  </Suspense>
                </>
              )}
            </div>
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultCardStyle}>
              <div className={styles.resultCardItemStyle}>
                {searchParams.prompt && (
                  <p className={styles.resultPromptStyle}>
                    {searchParams.prompt}
                  </p>
                )}
              </div>
              <div className={styles.resultCardItemStyle}>
                {searchParams.prompt && (
                  <CopyButton prompt={searchParams.prompt} />
                )}
              </div>
              <div className={styles.resultCardItemStyle}>
                <div className={styles.resultSnsListStyle}>
                  <TwitterShareButton
                    text="MorPhotoで画像を生成したよ！"
                    hashtags={["morphoto"]}
                    url={`${env.CLIENT_URL}`}
                  />
                  <MisskeyShareButton
                    title="MorPhotoで画像を生成したよ！"
                    text="#morphoto"
                    url={`${env.CLIENT_URL}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultCardStyle}>
              <div className={styles.resultCardItemStyle}>
                <span className={styles.resultCardTitleStyle}>Before</span>
              </div>
              <div className={styles.resultCardItemStyle}>
                {searchParams.morphoto_id && (
                  <Suspense>
                    <Parents morphoto_id={searchParams.morphoto_id} />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
