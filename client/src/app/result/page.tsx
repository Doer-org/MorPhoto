"use client";

import { Button } from "@/ui";
import {
  CopyButton,
  MisskeyShareButton,
  Parents,
  RemixLink,
  ResultImage,
  SaveLink,
  TwitterShareButton,
  Modal,
} from "./_component";
import { Suspense, useEffect, useState } from "react";

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
              {searchParams.morphoto_id && (
                <>
                  <Suspense>
                    <RemixLink morphoto_id={searchParams.morphoto_id} />
                  </Suspense>
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
                  <TwitterShareButton text="test" />
                  <MisskeyShareButton title="test" text="test test" />
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
