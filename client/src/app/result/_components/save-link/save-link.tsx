import { FC } from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import { IconButton } from "../icon-button";
import { readMorphoto } from "@/api";

import * as styles from "./save-link.css";
import { getImageUrl } from "@/utils";

type Props = {
  child_id: string;
};

export const SaveLink: FC<Props> = ({ child_id }) => {
  return (
    <a
      className={styles.linkStyle}
      href={getImageUrl(child_id)}
      download={child_id}
    >
      <IconButton
        tabIndex={-1}
        renderIcon={(className) => <DownloadIcon className={className} />}
        label="Save"
      />
    </a>
  );
};
