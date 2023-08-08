import { style } from "@vanilla-extract/css";

export const imageListStyle = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
});

export const imageWrapperStyle = style({
  position: "relative",
  aspectRatio: "1",
});

export const imageStyle = style({
  objectFit: "cover",
});
