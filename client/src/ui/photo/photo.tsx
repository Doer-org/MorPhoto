import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";
import Image from "next/image";

import * as styles from "./photo.css";
type Props = Omit<ComponentPropsWithRef<typeof Image>, "width" | "height"> & {
  variant?: "square" | "rounded";
  width: number | `${number}`;
  height: number | `${number}`;
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
