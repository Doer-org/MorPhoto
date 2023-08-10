import { style, styleVariants } from "@vanilla-extract/css";
import { slate } from "@radix-ui/colors";

const base = style({ fontSize: 42 });

export const titleVariantStyle = styleVariants({
  default: [
    base,
    {
      color: slate.slate12,
    },
  ],
  primary: [
    base,
    {
      background: "linear-gradient(90deg, #793AAF, #3451B2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  ],
});
