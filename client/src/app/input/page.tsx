"use client";

import { ChangeEvent, useState } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { ImageIcon } from "@radix-ui/react-icons";
import { uploadImage } from "@/api";
import { Card, Slider } from "@/ui";
import { InputButton } from "./_component";

import * as styles from "./input.css";

type Inputs = {
  prompt: string;
  images: FileList;
  strength: number[];
};

const Page = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {};

  const strength = useWatch({
    control,
    name: "strength",
    defaultValue: [0.5],
  });

  const [imgUrlBase64, setImgUrlBase64] = useState<string>("");
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImgUrlBase64("");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgUrlBase64 = reader.result as string;
      setImgUrlBase64(imgUrlBase64);
      console.log(reader.result);
    };
  };

  return (
    <div>
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
                        <div className={styles.uploadCardImageStyle}>
                          {imgUrlBase64 ? (
                            <Image
                              src={imgUrlBase64}
                              layout="fill"
                              objectFit="contain"
                              alt="入力画像"
                            />
                          ) : (
                            <ImageIcon width={60} height={60} />
                          )}
                        </div>
                        <label className={styles.uploadCardLabelStyle}>
                          <input
                            className={styles.uploadCardInputStyle}
                            type="file"
                            accept="image/jpeg,image/png"
                            {...register("images")}
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
