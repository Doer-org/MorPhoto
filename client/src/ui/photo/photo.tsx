import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import Image from "next/image";

import * as styles from "./photo.css";
type Props = ComponentPropsWithRef<typeof Image> & {
  variant?: "square" | "rounded";
};

const _Photo = forwardRef(
  (
    { variant = "square", width = 120, height = 120, ...props }: Props,
    ref: ForwardedRef<HTMLImageElement>
  ) => {
    return (
      <Image
        className={styles.photoVariantStyle[variant]}
        width={width}
        height={height}
        {...props}
        ref={ref}
      />
    );
  }
);

_Photo.displayName = "Photo";

export const Photo = _Photo;
