import { style, styleVariants } from "@vanilla-extract/css";
import { blackA } from "@radix-ui/colors";

export const uploadCardHeaderStyle = style({});

export const uploadCardTitleStyle = style({
  fontSize: 16,
  fontWeight: "bold",
});

export const uploadCardContentStyle = style({
  marginTop: 8,
});

export const uploadCardItemStyle = style({
  marginTop: 12,
  ":first-child": {
    marginTop: 0,
  },
});

export const uploadCardImageListStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "12px 0",
});

export const uploadCardImageWrapperStyle = style({
  position: "relative",
  height: 240,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const uploadCardImageStyle = style({
  objectFit: "contain",
});

export const uploadCardSliderHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const uploadCardSliderInputStyle = style({
  marginTop: 8,
});
