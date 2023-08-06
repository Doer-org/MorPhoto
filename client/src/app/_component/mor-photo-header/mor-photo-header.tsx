import { Header } from "@/ui";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import * as styles from "./mor-photo-header.css";

type Props = ComponentPropsWithoutRef<"header">;

export const MorPhotoHeader = forwardRef<HTMLElement, Props>(({}, ref) => {
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
      rightChildren={
        <Image src={"/assets/nijika1.png"} width={20} height={20} alt="ロゴ" />
      }
      ref={ref}
    />
  );
});

MorPhotoHeader.displayName = "MorPhotoHeader";
