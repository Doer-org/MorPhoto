import { styleVariants } from "@vanilla-extract/css";

import { blueDark, grayDark } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

const base = style({
  padding: "0.5rem 1rem",
  color: "white",
});

export const buttonVariantStyle = styleVariants({
  primary: [
    base,
    {
      backgroundColor: blueDark.blue7,
      border: "none",
      borderRadius: "0.5rem",
      ":hover": {
        backgroundColor: blueDark.blue3,
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: grayDark.gray7,
      border: `1px solid ${grayDark.gray10}`,
      borderRadius: "0.1rem",
      ":hover": {
        backgroundColor: grayDark.gray3,
      },
    },
  ],
});
