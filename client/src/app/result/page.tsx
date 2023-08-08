"use client";

import { Button } from "@/ui";
import { Modal } from "@/app/_component";
import Image from "next/image";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import {
  IconButton,
  MisskeyShareButton,
  RemixLink,
  ResultImage,
  SaveLink,
  TwitterShareButton,
} from "./_component";
import { useEffect, useState, ReactNode } from "react";

import * as styles from "./result.css";

export default function ResultPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { morphoto_id: string };
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>(
    " best quality masterpiece makoto shinkai"
  );
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(
      () => {
        console.log("Copying to clipboard was successful!");
        setCopied(true);
      },
      (err) => console.log("Copying to clipboard was failed", err)
    );
  };

  return (
    <div className={styles.resultStyle}>
      <Modal
        trigger={<Button variant="primary">View Result</Button>}
        open={modalOpen}
        onOpenChange={(open) => setModalOpen(open)}
      >
        <div className={styles.resultModalContentStyle}>
          <div className={styles.resultModalItemStyle}>
            <ResultImage morphoto_id={searchParams.morphoto_id} />
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultButtonGroupStyle}>
              {searchParams.morphoto_id && (
                <>
                  <RemixLink morphoto_id={searchParams.morphoto_id} />
                  <SaveLink morphoto_id={searchParams.morphoto_id} />
                </>
              )}
            </div>
          </div>
          <div className={styles.resultModalItemStyle}>
            <div className={styles.resultCardStyle}>
              <div className={styles.resultCardItemStyle}>
                <p className={styles.resultPromptStyle}>{prompt}</p>
              </div>
              <div className={styles.resultCardItemStyle}>
                <IconButton
                  onClick={handleCopy}
                  renderIcon={(className) =>
                    copied ? (
                      <CheckIcon className={className} />
                    ) : (
                      <CopyIcon className={className} />
                    )
                  }
                  label={copied ? "Copied!" : "Copy Prompt"}
                />
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
                <div className={styles.resultCardImageListStyle}>
                  {(() => {
                    const photos: ReactNode[] = [];
                    for (let i = 0; i < 5; i++) {
                      photos.push(
                        <div
                          key={i}
                          className={styles.resultCardImageWrapperStyle}
                        >
                          <Image
                            className={styles.resultImageStyle}
                            src={"/assets/nijika1.png"}
                            fill
                            alt="出力画像"
                          />
                        </div>
                      );
                    }
                    return photos;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
