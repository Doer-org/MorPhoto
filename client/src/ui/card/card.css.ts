import { style, styleVariants } from "@vanilla-extract/css";
import { indigo, slate } from "@radix-ui/colors";

const base = style({
  backgroundColor: "white",
  padding: "12px 18px",
  borderRadius: "10px",
  boxSizing: "border-box",
  color: slate.slate11,
  ":focus": {
    outline: `2px solid ${indigo.indigo9}`,
  },
});

export const cardVariantStyle = styleVariants({
  default: [base],
});
