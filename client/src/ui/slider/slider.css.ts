import { style } from "@vanilla-extract/css";
import { blueA, olive, sageDark } from "@radix-ui/colors";

export const sliderRoot = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  maxWidth: "600px",
  height: "12px",
});

export const sliderTrack = style({
  backgroundColor: sageDark.sage10,
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",
  height: "2px",
});

export const sliderRange = style({
  position: "absolute",
  backgroundColor: blueA.blueA11,
  borderRadius: "9999px",
  height: "100%",
});

export const sliderThumb = style({
  display: "block",
  width: "12px",
  height: "12px",
  backgroundColor: olive.olive7,
  borderRadius: "10px",
  ":hover": {
    backgroundColor: olive.olive5,
  },
  ":focus": {
    outline: "none",
  },
});
