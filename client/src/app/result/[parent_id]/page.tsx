"use client";

import {
  CopyButton,
  MisskeyShareButton,
  Parent,
  CreateLink,
  ResultImage,
  SaveLink,
  TwitterShareButton,
  Title,
} from "./_components";
import { useEffect, useRef, useState } from "react";
import { TMorphoto } from "@/types/Morphoto";
import { createInference, readGcs, readMorphoto, readStatus } from "@/api";
import { env } from "@/constants";

import * as styles from "./result.css";

export default function ResultPage({
  params: { parent_id },
  searchParams: { prompt, strength },
}: {
  params: { parent_id: string };
  searchParams: { prompt?: string; strength?: string };
}) {
  const [morphoto, setMorphoto] = useState<TMorphoto | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [gcsRegistered, setGcsRegistered] = useState<boolean>(true);

  const getMorphoto = () => {
    if (!prompt || !strength) {
      readMorphoto(parent_id)
        .then((result) => {
          if (result.type === "error" || !result.value.data) {
            return console.log("少々お待ちください");
          }
          console.log(result);
          setMorphoto(result.value.data);
          setDone(true);
        })
        .catch((err) => {
          console.error("何らかのエラーが発生しました", err);
        });
    }
  };

  const checkGcs = () => {
    readGcs(parent_id)
      .then((result) => {
        if (result.type === "error") {
          setGcsRegistered(false);
          return alert("不正なURLです。URLを確認してください。");
        }
        setGcsRegistered(true);
      })
      .catch((err) => {
        console.error("何らかのエラーが発生しました", err);
      });
  };

  const checkStatus = () => {
    readStatus(parent_id)
      .then((result) => {
        console.log(result);
        if (result.type === "error" || !result.value.data) {
          return console.log("まだ登録されていません");
        }
        setDone(result.value.data.is_done);
      })
      .catch((err) => {
        console.error("何らかのエラーが発生しました", err);
      });
  };

  const morphing = () => {
    if (prompt && strength) {
      createInference(parent_id, {
        prompt: prompt,
        strength: Number(strength),
        // is_mock: true,
      })
        .then((result) => {
          if (result.type === "error" || !result.value.data) {
            return console.log("少々お待ちください");
          }
          console.log(result);
          setMorphoto(result.value.data);
          setDone(true);
        })
        .catch((err) => {
          console.error("何らかのエラーが発生しました", err);
        });
    }
  };

  const callbackRef = useRef(morphing);

  useEffect(() => {
    if (!gcsRegistered) {
      callbackRef.current = () => null;
      return;
    }
    if (!done) {
      callbackRef.current = morphing;
      return;
    }
    callbackRef.current = () => null;
  }, [morphing]);

  useEffect(() => {
    const timer = setInterval(() => {
      callbackRef.current();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    checkGcs();
    checkStatus();
    morphing();
    getMorphoto();
  }, []);

  return (
    <div className={styles.resultStyle}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Title />
      </div>
      <div className={styles.resultModalContentStyle}>
        <div className={styles.resultModalItemStyle}>
          {done && morphoto ? (
            <ResultImage child_id={morphoto.child_id} />
          ) : (
            <p>
              {gcsRegistered ? (
                <>
                  この処理には40秒程度かかります。少々お待ちください。
                  <br />
                  This process takes about 40 seconds. Please wait a moment.
                </>
              ) : (
                "URLを確認してください。"
              )}
            </p>
          )}
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
                    text={
                      prompt
                        ? `「${prompt}」で変換画像を生成しました！`
                        : "変換画像を生成しました！"
                    }
                    hashtags={["MorPhoto"]}
                    url={`${env.CLIENT_URL}/result/${morphoto.parent_id}`}
                  />
                  <MisskeyShareButton
                    title={
                      prompt
                        ? `「${prompt}」で変換画像を生成しました！`
                        : "変換画像を生成しました！"
                    }
                    text="#MorPhoto"
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
    </div>
  );
}
