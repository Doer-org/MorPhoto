import { FC } from "react";
import Link from "next/link";
import { ImageIcon } from "@radix-ui/react-icons";
import { IconButton } from "../icon-button";
import { readMorphoto } from "@/api";

import * as styles from "./remix-link.css";

type Props = {
  morphoto_id: string;
};

export const RemixLink: FC<Props> = async ({ morphoto_id }) => {
  const morphoto = await readMorphoto(morphoto_id);
  if (morphoto.type === "error") return <></>;

  const params = new URLSearchParams();
  const parent_id = morphoto.value.data.parent_id;
  if (parent_id) params.set("parent_id", parent_id);

  return (
    <Link
      className={styles.linkStyle}
      href={{
        pathname: "/input",
        query: params.toString(),
      }}
    >
      <IconButton
        tabIndex={-1}
        renderIcon={(className) => <ImageIcon className={className} />}
        label="Remix"
      />
    </Link>
  );
};
