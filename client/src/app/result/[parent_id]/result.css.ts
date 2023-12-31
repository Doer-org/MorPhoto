import { slate } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

export const resultStyle = style({
  padding: "48px 16px 120px",
  margin: "0 auto",
  maxWidth: 800,
});

export const resultModalContentStyle = style({
  marginTop: 24,
});

export const resultModalItemStyle = style({
  marginTop: 14,
  ":first-child": {
    marginTop: 0,
  },
});

export const resultCardStyle = style({
  padding: 20,
  backgroundColor: slate.slate3,
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
  color: slate.slate11,
});

export const resultButtonGroupStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
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
