import { style, styleVariants } from "@vanilla-extract/css";
import { blueA, sageDark } from "@radix-ui/colors";

const base = style({
  backgroundColor: "white",
  padding: "12px 18px",
  borderRadius: "10px",
  boxSizing: "border-box",
  maxWidth: "800px",
  color: sageDark.sage10,
  ":focus": {
    outline: `2px solid ${blueA.blueA11}`,
  },
});

export const cardVariantStyle = styleVariants({
  default: [base],
});
