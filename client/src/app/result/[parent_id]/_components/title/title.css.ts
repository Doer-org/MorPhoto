import { style, styleVariants } from "@vanilla-extract/css";

const base = style({
  fontSize: 42,
});

export const titleVariantStyle = styleVariants({
  default: [
    base,
    {
      display: "inline-block",
      background: "linear-gradient(90deg, #11181C, #3D4449)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
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
