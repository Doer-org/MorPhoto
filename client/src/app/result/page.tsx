"use client";

import { Modal } from "@/ui";
import Image from "next/image";
import { CopyIcon, DownloadIcon, ImageIcon } from "@radix-ui/react-icons";

import * as styles from "./result.css";
import { IconButton, TwitterShareButton } from "./_component";

const Page = () => {
  return (
    <>
      <h2>Result Page</h2>
      <div>
        <Modal>
          <div className={styles.resultModalContentStyle}>
            <div className={styles.resultModalItemStyle}>
              <div className={styles.resultHeadImageWrapperStyle}>
                <Image
                  className={styles.resultImageStyle}
                  src={"/assets/nijika2.png"}
                  fill
                  alt="出力画像"
                />
              </div>
            </div>
            <div className={styles.resultModalItemStyle}>
              <div className={styles.resultButtonGroupStyle}>
                <IconButton
                  renderIcon={(className) => (
                    <ImageIcon className={className} />
                  )}
                  label="Remix"
                />
                <IconButton
                  renderIcon={(className) => (
                    <DownloadIcon className={className} />
                  )}
                  label="Save"
                />
              </div>
            </div>
            <div className={styles.resultModalItemStyle}>
              <div className={styles.resultCardStyle}>
                <div className={styles.resultCardItemStyle}>
                  <p className={styles.resultPromptStyle}>
                    best quality masterpiece makoto shinkai
                  </p>
                </div>
                <div className={styles.resultCardItemStyle}>
                  <IconButton
                    renderIcon={(className) => (
                      <CopyIcon className={className} />
                    )}
                    label="Copy Prompt"
                  />
                </div>
                <div className={styles.resultCardItemStyle}>
                  <TwitterShareButton text="test" />
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
                    <div className={styles.resultCardImageWrapperStyle}>
                      <Image
                        className={styles.resultImageStyle}
                        src={"/assets/nijika1.png"}
                        fill
                        alt="出力画像"
                      />
                    </div>
                    <div className={styles.resultCardImageWrapperStyle}>
                      <Image
                        className={styles.resultImageStyle}
                        src={"/assets/nijika1.png"}
                        fill
                        alt="出力画像"
                      />
                    </div>
                    <div className={styles.resultCardImageWrapperStyle}>
                      <Image
                        className={styles.resultImageStyle}
                        src={"/assets/nijika1.png"}
                        fill
                        alt="出力画像"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Page;
