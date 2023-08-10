import { style } from "@vanilla-extract/css";
import { indigo, slate } from "@radix-ui/colors";

export const sliderRoot = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  height: "12px",
});

export const sliderTrack = style({
  backgroundColor: slate.slate11,
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",
  height: "2px",
});

export const sliderRange = style({
  position: "absolute",
  backgroundColor: indigo.indigo9,
  borderRadius: "9999px",
  height: "100%",
});

export const sliderThumb = style({
  display: "block",
  width: "12px",
  height: "12px",
  backgroundColor: slate.slate6,
  borderRadius: "10px",
  ":hover": {
    backgroundColor: slate.slate8,
  },
  ":focus": {
    outline: "none",
  },
});
