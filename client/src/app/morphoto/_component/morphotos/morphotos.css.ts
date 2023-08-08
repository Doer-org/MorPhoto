import { style } from "@vanilla-extract/css";

export const morphotosStyle = style({
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(2, 1fr)",
  "@media": {
    "screen and (min-width: 600px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});
