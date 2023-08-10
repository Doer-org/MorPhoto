import { Header } from "@/ui";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import * as styles from "./morphoto-header.css";

type Props = ComponentPropsWithoutRef<"header">;

export const MorphotoHeader = forwardRef<HTMLElement, Props>(({}, ref) => {
  return (
    <Header
      className={styles.headerStyle}
      leftChildren={
        <h1 className={styles.logoStyle}>
          <Link href={"/"}>
            <span className={styles.logoBlueStyle}>Mor</span>Photo
          </Link>
        </h1>
      }
      rightChildren={<div></div>}
      ref={ref}
    />
  );
});

MorphotoHeader.displayName = "MorphotoHeader";
