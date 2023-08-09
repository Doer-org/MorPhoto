import { style } from "@vanilla-extract/css";

export const imageWrapperStyle = style({
  display: "block",
  position: "relative",
  width: "100%",
  maxWidth: "400px",
  aspectRatio: "1",
  margin: "0 auto",
});

export const imageStyle = style({
  objectFit: "cover",
});
