import { styleVariants } from "@vanilla-extract/css";

import { style } from "@vanilla-extract/css";

const base = style({
  objectFit: "cover",
});

export const photoVariantStyle = styleVariants({
  square: [base],
  rounded: [
    base,
    {
      borderRadius: "10px",
    },
  ],
});
