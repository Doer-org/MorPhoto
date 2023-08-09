import { style, styleVariants } from "@vanilla-extract/css";
import { blueDark } from "@radix-ui/colors";

const base = style({ fontSize: 42 });

export const titleVariantStyle = styleVariants({
  default: [
    base,
    {
      color: "white",
    },
  ],
  primary: [
    base,
    {
      color: blueDark.blue7,
    },
  ],
});
