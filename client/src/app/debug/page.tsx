"use client";

import { uploadImage } from "@/api";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputButton } from "./_component";
type Inputs = {
  images: FileList;
};

const Page = () => {
  const [imgUrlBase64, setImgUrlBase64] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const imageIDinGcs = await uploadImage(data.images[0]);
    console.log("upload", imageIDinGcs?.fileName);
    if (!imageIDinGcs) return alert("画像のアップロードに失敗しました。");
    const { fileName } = imageIDinGcs;
    setImage(`https://storage.googleapis.com/morphoto_strage/${fileName}`);

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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          paddingTop: "3rem",
          paddingLeft: "10%",
          width: "80%",
        }}
      >
        <div>
          <h2>Upload</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="image">入力画像</label>
              {errors.images && <span>This field is required</span>}
              <input
                type="file"
                id="image"
                accept="image/jpeg,image/png"
                {...register("images")}
                onChange={handleImageChange}
              />
              {imgUrlBase64 && (
                <div>
                  <Image
                    src={imgUrlBase64}
                    alt="input image"
                    width={160}
                    height={160}
                  />
                </div>
              )}
            </div>
            <InputButton type="submit" value={"submit"} />
          </form>
        </div>
        <div>
          <h2>Result</h2>
          {image && <a href={image}>{image}</a>}
        </div>
      </div>
    </>
  );
};

export default Page;
