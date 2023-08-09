import Link from "next/link";
import { ImageIcon } from "@radix-ui/react-icons";
import { IconButton } from "../icon-button";

import * as styles from "./create-link.css";

export const CreateLink = () => {
  return (
    <Link className={styles.linkStyle} href={"/create"}>
      <IconButton
        tabIndex={-1}
        renderIcon={(className) => <ImageIcon className={className} />}
        label="Create"
      />
    </Link>
  );
};
