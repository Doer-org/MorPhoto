"use client";

import { Card } from "@/ui";
import { ComponentPropsWithoutRef, forwardRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

import { Inter, Noto_Sans_JP } from "next/font/google";

import * as styles from "./prompt-card.css";

const notoSansJP = Noto_Sans_JP({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: false,
});

type Inputs = {
  prompt: string;
  image: File;
  strength: number[];
};

type Props = ComponentPropsWithoutRef<"div"> & {
  register: UseFormRegister<Inputs>;
};

export const PromptCard = forwardRef<HTMLDivElement, Props>(
  ({ register }, ref) => {
    const [variant, setVariant] = useState<"default" | "onfocus">("default");
    const message = [
      "(例) 花火大会 夏 すいか",
      "(ex) firework summer watermelon",
    ].join("\n");

    return (
      <Card ref={ref}>
        <div className={styles.headerStyle}>
          <span className={styles.titleStyle}>Prompt</span>
        </div>
        <div className={styles.contentStyle}>
          <textarea
            className={[
              styles.textareaVariantStyle[variant],
              notoSansJP.className,
            ].join(" ")}
            {...register("prompt", { required: "promptを入力してください" })}
            onFocus={() => setVariant("onfocus")}
            onBlur={() => setVariant("default")}
            placeholder={message}
          ></textarea>
        </div>
      </Card>
    );
  }
);

PromptCard.displayName = "PromptCard";
