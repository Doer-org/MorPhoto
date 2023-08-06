import { grayDark } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

export const resultStyle = style({
  padding: "120px 16px",
});

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
  maxWidth: "400px",
  aspectRatio: "1",
  margin: "0 auto",
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
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 10,
});

export const resultCardImageWrapperStyle = style({
  position: "relative",
  aspectRatio: "1",
});

export const resultImageStyle = style({
  objectFit: "cover",
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

export const resultSnsListStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 24,
});
