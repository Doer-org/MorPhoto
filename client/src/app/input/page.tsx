"use client";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [imgUrlBase64, setImgUrlBase64] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) {
      setImgUrlBase64("");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgUrlBase64 = reader.result as string;
      setImgUrlBase64(imgUrlBase64);
    };
  };

  return (
    <>
      <h2>Input Page</h2>
      <div>
        <label htmlFor="prompt">プロンプト</label>
        <input type="text" id="prompt" />
      </div>
      <div>
        <label htmlFor="image">入力画像</label>
        <input
          type="file"
          id="image"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
        />
      </div>
      {imgUrlBase64 && (
        <div>
          <img src={imgUrlBase64} alt="" width={160} height={160} />
        </div>
      )}
      <div>
        <label htmlFor="strength">変化量</label>
        <input type="number" id="strength" min={0} max={1} step={0.01} />
      </div>
    </>
  );
};

export default Page;
