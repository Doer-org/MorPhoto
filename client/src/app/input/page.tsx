"use client";

import { ChangeEvent, DragEvent, useState, useEffect } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import { uploadImage } from "@/api";
import { Card, Slider } from "@/ui";
import { InputButton } from "./_component";

import * as styles from "./input.css";

type Inputs = {
  prompt: string;
  image: File;
  strength: number[];
};

const Page = () => {
  const [imageUrlBase64, setImageUrlBase64] = useState<string>("");
  const [isDragActive, setisDragActive] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageIDinGcs = await uploadImage(data.image);
    console.log("upload", imageIDinGcs?.fileName);
    if (!imageIDinGcs) return alert("画像のアップロードに失敗しました。");
    const { fileName } = imageIDinGcs;

    console.log(
      "url",
      `https://storage.googleapis.com/morphoto_strage/${fileName}`
    );
    (async () => {
      const res = await fetch(`/api/image?file=${fileName}`, {
        method: "GET",
      });
      const JSONRes = await res.json();
      console.log("singed url(不要)", JSONRes);
    })();
  };

  const strength = useWatch({
    control,
    name: "strength",
    defaultValue: [0.5],
  });

  const baseHandleImageAdd = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) {
      return;
    }
    setValue("image", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrlBase64 = reader.result as string;
      setImageUrlBase64(imageUrlBase64);
    };
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    baseHandleImageAdd(e.target.files);
  };

  const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setisDragActive(false);
    baseHandleImageAdd(e.dataTransfer.files);
  };

  useEffect(() => {
    setValue("strength", strength);
  }, []);

  return (
    <div className={styles.inputPageStyle}>
      <div className={styles.inputPageContentStyle}>
        <div className={styles.inputPageItemStyle}>
          <h2 className={styles.inputPageHeadingVariantStyle["default"]}>
            Let{"'"}s start
            <br />
            <span className={styles.inputPageHeadingVariantStyle["primary"]}>
              morphing!
            </span>
          </h2>
        </div>
        <div className={styles.inputPageItemStyle}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputPageFormItemStyle}>
              <Card>
                <div className={styles.promptCardStyle}>
                  <div className={styles.promptCardHeaderStyle}>
                    <span className={styles.promptCardTitleStyle}>Prompt</span>
                  </div>
                  <div className={styles.promptCardContentStyle}>
                    <textarea
                      className={styles.promptCardInputStyle}
                      {...register("prompt")}
                    ></textarea>
                  </div>
                </div>
              </Card>
            </div>
            <div className={styles.inputPageFormItemStyle}>
              <Card>
                <div className={styles.uploadCardStyle}>
                  <div className={styles.uploadCardHeaderStyle}>
                    <span className={styles.uploadCardTitleStyle}>
                      Upload Photo
                    </span>
                  </div>
                  <div className={styles.uploadCardContentStyle}>
                    <div className={styles.uploadCardItemStyle}>
                      <div className={styles.uploadCardImageListStyle}>
                        <div className={styles.uploadCardImageWrapperStyle}>
                          {imageUrlBase64 ? (
                            <Image
                              className={styles.uploadCardImageStyle}
                              src={imageUrlBase64}
                              fill
                              alt="入力画像"
                            />
                          ) : (
                            <ImageIcon width={60} height={60} />
                          )}
                        </div>
                        <label
                          className={
                            styles.uploadCardLabelVariantStyle[
                              isDragActive ? "drag" : "default"
                            ]
                          }
                          onDragEnter={() => setisDragActive(true)}
                          onDragLeave={() => setisDragActive(false)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleImageDrop}
                        >
                          <input
                            className={styles.uploadCardInputStyle}
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className={styles.uploadCardItemStyle}>
                      <div className={styles.uploadCardSliderHeaderStyle}>
                        <span className={styles.uploadCardTitleStyle}>
                          Strength
                        </span>
                        <span>{Math.round(strength[0] * 100)}%</span>
                      </div>
                      <div className={styles.uploadCardSliderInputStyle}>
                        <Slider
                          value={strength}
                          onValueChange={(v) => setValue("strength", v)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className={styles.inputPageFormItemStyle}>
              <InputButton type="submit" value={"Generate Photo"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
