"use client";

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useState,
  SetStateAction,
  Dispatch,
  ChangeEvent,
  DragEvent,
} from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import * as styles from "./file-uploader.css";

type Inputs = {
  prompt: string;
  image: File;
  strength: number[];
};

type Props = ComponentPropsWithoutRef<"label"> & {
  setValue: UseFormSetValue<Inputs>;
  setImageUrlBase64: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
};

export const FileUploader = forwardRef<HTMLLabelElement, Props>(
  ({ setValue, setImageUrlBase64, disabled, ...props }, ref) => {
    const [labelVariant, setLabelVariant] = useState<"default" | "drag">(
      "default"
    );

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

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

    const handleImageDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setLabelVariant("default");
      const file = e.dataTransfer.files?.[0];

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

    return (
      <label
        className={styles.labelVariantStyle[labelVariant]}
        style={
          disabled
            ? {
                pointerEvents: "none",
              }
            : {
                pointerEvents: "auto",
              }
        }
        onDragEnter={() => setLabelVariant("drag")}
        onDragLeave={() => setLabelVariant("default")}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImageDrop}
        {...props}
        ref={ref}
      >
        <input
          className={styles.inputStyle}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleImageChange}
        />
      </label>
    );
  }
);

FileUploader.displayName = "FileUploader";
