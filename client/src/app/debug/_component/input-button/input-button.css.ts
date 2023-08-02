import { blueDark } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

const base = style({
  padding: "0.5rem 1rem",
  color: "white",
});

export const uploadButtonStyle = style([
  base,
  {
    backgroundColor: blueDark.blue7,
    border: "none",
    borderRadius: "0.5rem",
    ":hover": {
      backgroundColor: blueDark.blue3,
    },
  },
]);
