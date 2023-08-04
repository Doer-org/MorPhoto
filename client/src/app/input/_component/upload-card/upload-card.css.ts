import { style } from "@vanilla-extract/css";

export const uploadCardStyle = style({});

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
});

export const uploadCardImageStyle = style({
  position: "relative",
  minHeight: 160,
  minWidth: 160,
});

export const uploadCardSliderHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const uploadCardSliderInputStyle = style({
  marginTop: 8,
});
