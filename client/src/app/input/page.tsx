"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageIcon } from "@radix-ui/react-icons";
import { uploadImage } from "@/api";
import { Modal } from "@/app/_component";
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
  searchParams: { inputImageUrl?: string };
}) => {
  const [imageUrlBase64, setImageUrlBase64] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitted },
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

    router.push("/result");
  };

  const strength = useWatch({
    control,
    name: "strength",
    defaultValue: [0.5],
  });

  const handleImage = (file?: File) => {
    if (!file) {
      return;
    }
    setValue("image", file);

    // base64変換
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageUrlBase64 = reader.result as string;
      setImageUrlBase64(imageUrlBase64);
    };
  };

  useEffect(() => {
    (async () => {
      const pathName = searchParams.inputImageUrl;
      if (pathName) {
        const file = await fetch(pathName)
          .then((res) => res.blob())
          .then((blob) => new File([blob], "nijika2.png"));
        handleImage(file);
      }
    })();
    setValue("strength", strength);
  }, []);

  return (
    <div className={styles.inputPageStyle}>
      <div className={styles.inputPageContentStyle}>
        <div className={styles.inputPageItemStyle}>
          <Title />
        </div>
        <div className={styles.inputPageItemStyle}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <InputButton type="submit" value={"Generate Photo"} />
            </div>
          </form>
        </div>
      </div>
      {(isSubmitting || isSubmitted) && (
        <Modal open>{isSubmitting ? "ちょっとまってね" : "おわったよ"}</Modal>
      )}
    </div>
  );
};

export default InputPage;
