import { style } from "@vanilla-extract/css";

export const headerStyle = style({});

export const titleStyle = style({
  fontSize: 16,
  fontWeight: "bold",
});

export const contentStyle = style({
  marginTop: 8,
});

export const itemStyle = style({
  marginTop: 12,
  ":first-child": {
    marginTop: 0,
  },
});

export const imageListStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "12px 0",
});

export const imageWrapperStyle = style({
  position: "relative",
  height: 240,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const imageStyle = style({
  objectFit: "contain",
});

export const sliderHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const sliderInputStyle = style({
  marginTop: 8,
});
