import { FC } from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IconButton } from "../icon-button";
import { readMorphoto } from "@/api";

import * as styles from "./save-link.css";
import { getImageUrl } from "@/utils";

type Props = {
  morphoto_id: string;
};

export const SaveLink: FC<Props> = async ({ morphoto_id }) => {
  const morphoto = await readMorphoto(morphoto_id);
  if (morphoto.type === "error") return <></>;

  const imageUrl = getImageUrl(morphoto.value.data.child_id);
  const fileName = imageUrl.split("/").pop();

  return (
    <a
      className={styles.linkStyle}
      href={imageUrl}
      download={fileName || "morphoto.png"}
    >
      <IconButton
        tabIndex={-1}
        renderIcon={(className) => <DownloadIcon className={className} />}
        label="Save"
      />
    </a>
  );
};
