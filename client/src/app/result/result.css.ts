import { grayDark } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

export const resultModalContentStyle = style({});

export const resultModalItemStyle = style({
  marginTop: 14,
  ":first-child": {
    marginTop: 0,
  },
});

export const resultHeadImageWrapperStyle = style({
  display: "block",
  position: "relative",
  width: "100%",
  minHeight: "50vh",
});

export const resultCardStyle = style({
  padding: 20,
  backgroundColor: grayDark.gray7,
});

export const resultCardItemStyle = style({
  marginTop: 14,
  ":first-child": {
    marginTop: 0,
  },
});

export const resultCardTitleStyle = style({
  display: "block",
  fontSize: 14,
  fontWeight: 600,
  textAlign: "center",
});

export const resultCardImageListStyle = style({
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
});

export const resultCardImageWrapperStyle = style({
  display: "block",
  position: "relative",
  width: "30%",
  minHeight: 200,
});

export const resultImageStyle = style({
  objectFit: "contain",
});

export const resultButtonGroupStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
});

export const resultLinkStyle = style({
  width: "100%",
});

export const resultPromptStyle = style({
  fontSize: 14,
});
