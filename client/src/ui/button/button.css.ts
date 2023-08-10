import { styleVariants } from "@vanilla-extract/css";

import { blueDark, grayDark, indigo, slate } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

const base = style({
  padding: "0.5rem 1rem",
  color: "white",
});

export const buttonVariantStyle = styleVariants({
  primary: [
    base,
    {
      backgroundColor: indigo.indigo11,
      border: "none",
      borderRadius: "0.5rem",
      ":hover": {
        backgroundColor: indigo.indigo12,
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: slate.slate3,
      border: `1px solid ${slate.slate6}`,
      borderRadius: "0.1rem",
      color: slate.slate11,
      ":hover": {
        backgroundColor: slate.slate6,
      },
    },
  ],
});
