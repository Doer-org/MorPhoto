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
    console.log(data.images);
    const imageIDinGcs = await uploadImage(data.images[0]);
    if (!imageIDinGcs) return alert("画像のアップロードに失敗しました。");
  };

  return (
    <>
      <h2>Input Page</h2>
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
        <InputButton type="submit" value={"upload"} />
      </form>
    </>
  );
};

export default Page;
