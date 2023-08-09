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
import {
  createInference,
  createMorphoto,
  readMorphoto,
  uploadImage,
} from "@/api";
import {
  FileUploader,
  InputButton,
  PromptCard,
  Title,
  UploadCard,
  Slider,
  Modal,
} from "./_components";
import { env } from "@/constants";

import * as styles from "./input-page.css";

type Inputs = {
  prompt: string;
  image: File;
  strength: number[];
};

type uploadResponse =
  | {
      fileName: string;
      err: false;
    }
  | {
      fileName: null;
      err: true;
    };

const InputPage = ({
  params,
  searchParams,
}: {
  params: {};
  searchParams: { parent_id?: string };
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

  const upload = async (file: File): Promise<uploadResponse> => {
    const imageIDinGcs = await uploadImage(file);
    console.log("upload", imageIDinGcs?.fileName);
    if (!imageIDinGcs) {
      confirm("画像のアップロードに失敗しました。");
      return { fileName: null, err: true };
    }

    const { fileName } = imageIDinGcs;
    return { fileName: fileName, err: false };

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // 画像変換処理
    const imageUrl = imageUrlBase64.split(",")[1];
    const inference = await createInference({
      prompt: data.prompt,
      strength: data.strength[0],
      image: imageUrl,
      // is_mock: true,
    });
    if (inference.type === "error") {
      confirm("画像変換に失敗しました");
      return window.location.reload();
    }

    // 生成前の画像の処理
    let currentFile;
    if (!searchParams.parent_id) {
      currentFile = await upload(data.image);
      if (currentFile.err) return window.location.reload();
      const currentMorphoto = await createMorphoto({
        // TODO: resultページへ移行
        parent_id: "a",
        child_id: "a",
        prompt: "a",
        strength: 0,
      });
      if (currentMorphoto.type === "error") {
        confirm("API通信に失敗しました");
        return window.location.reload();
      }
    }

    // 生成された画像の処理
    const convertedImageBase64 = inference.value.converted_image;
    const bin = atob(convertedImageBase64);
    const buffer = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
      buffer[i] = bin.charCodeAt(i);
    }
    const convertedImage = new File([buffer.buffer], "morphoto.png", {
      type: "image/jpeg",
    });
    const convertedFile = await upload(convertedImage);
    if (convertedFile.err) return window.location.reload();

    const morphoto = await createMorphoto({
      // TODO: resultページへ移行
      parent_id: "a",
      child_id: "a",
      prompt: "a",
      strength: 0,
    });
    if (morphoto.type === "error") {
      confirm("API通信に失敗しました");
      return window.location.reload();
    }

    // 結果ページへリダイレクト
    router.push(
      `/result?morphoto_id=${morphoto.value.data.parent_id}&prompt=${data.prompt}`
    );
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
    setValue("strength", strength);

    (async () => {
      if (!searchParams.parent_id) return;
      const morphoto = await readMorphoto(searchParams.parent_id);
      if (morphoto.type === "error") return;
      const pathName = `${env.GCS_URL}`;
      if (pathName) {
        const file = await fetch(pathName)
          .then((res) => res.blob())
          .then(
            (blob) =>
              new File([blob], pathName.split("/").pop() || "morphoto.png")
          );
        handleImage(file);
      }
    })();
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
                    disabled={Boolean(searchParams.parent_id)}
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
      <Modal open={isSubmitting}>
        {isSubmitting ? "ちょっとまってね" : "おわったよ"}
      </Modal>
    </div>
  );
};

export default InputPage;
