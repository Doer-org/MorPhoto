"use client";

import { useState, useEffect } from "react";
import {
  useForm,
  useWatch,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageIcon } from "@radix-ui/react-icons";
import { createGcs } from "@/api";
import {
  FileUploader,
  InputButton,
  PromptCard,
  Title,
  UploadCard,
  Slider,
} from "./_components";

import * as styles from "./input-page.css";

type Inputs = {
  prompt: string;
  image: File;
  strength: number[];
};

const InputPage = ({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { parent_id?: string };
}) => {
  const [imageUrlBase64, setImageUrlBase64] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    // GCS画像登録
    const gcsResult = await createGcs({ base64: imageUrlBase64 });
    if (gcsResult.type === "error")
      return alert("データの読み込みに失敗しました");
    if (!gcsResult.value.data)
      return alert("画像がありません。もう一度やり直してください。");

    // 結果ページへリダイレクト
    router.push(
      `/result/${gcsResult.value.data.id}?prompt=${data.prompt}&strength=${data.strength[0]}`
    );
    setLoading(false);
    setDone(true);
  };

  const onInvalid: SubmitErrorHandler<Inputs> = (errors) => {
    let message = "";

    if (errors.prompt?.message) {
      message += `${errors.prompt.message}\n`;
    }
    if (errors.image?.message) {
      message += `${errors.image.message}\n`;
    }
    if (errors.strength?.message) {
      message += errors.strength.message;
    }

    return alert(message);
  };

  const strength = useWatch({
    control,
    name: "strength",
    defaultValue: [0.5],
  });

  useEffect(() => {
    setValue("strength", strength);
  }, []);

  return (
    <div className={styles.inputPageStyle}>
      <div className={styles.inputPageContentStyle}>
        <div className={styles.inputPageItemStyle}>
          <Title />
        </div>
        <div className={styles.inputPageItemStyle}>
          <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <div className={styles.inputPageFormItemStyle}>
              <PromptCard register={register} />
            </div>
            <div className={styles.inputPageFormItemStyle}>
              <UploadCard
                renderPreview={(className) =>
                  imageUrlBase64 ? (
                    <Image
                      className={className}
                      src={imageUrlBase64}
                      fill
                      alt="入力画像"
                    />
                  ) : (
                    <ImageIcon width={60} height={60} />
                  )
                }
                fileUploader={
                  <FileUploader
                    setValue={setValue}
                    setImageUrlBase64={setImageUrlBase64}
                  />
                }
                slider={
                  <Slider
                    value={strength}
                    onValueChange={(v) => setValue("strength", v)}
                  />
                }
                strength={strength}
              />
            </div>
            <div className={styles.inputPageFormItemStyle}>
              <InputButton
                type="submit"
                value={
                  done
                    ? "Start morphing"
                    : loading
                    ? "Loading..."
                    : "Generate Photo"
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputPage;
