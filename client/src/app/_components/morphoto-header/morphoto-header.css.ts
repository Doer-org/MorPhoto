import { style } from "@vanilla-extract/css";

export const headerStyle = style({
  padding: "12px 16px",
  backgroundColor: "inherit",
  zIndex: 100,
});

export const logoStyle = style({
  fontSize: 18,
  fontWeight: 700,
});

export const logoBlueStyle = style({
  display: "inline-block",
  background: "linear-gradient(90deg, #793AAF, #3451B2)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const logoGrayStyle = style({
  display: "inline-block",
  background: "linear-gradient(90deg, #11181C, #3D4449)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});
