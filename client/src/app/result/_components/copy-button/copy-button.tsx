"use client";

import { IconButton } from "../icon-button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState, FC } from "react";

type Props = {
  prompt: string;
};

export const CopyButton: FC<Props> = ({ prompt }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt).then(
      () => {
        console.log("Copying to clipboard was successful!");
        setCopied(true);
      },
      (err) => console.log("Copying to clipboard was failed", err)
    );
  };

  return (
    <IconButton
      onClick={handleCopy}
      renderIcon={(className) =>
        copied ? (
          <CheckIcon className={className} />
        ) : (
          <CopyIcon className={className} />
        )
      }
      label={copied ? "Copied!" : "Copy Prompt"}
    />
  );
};
