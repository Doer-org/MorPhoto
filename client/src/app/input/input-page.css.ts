import { style } from "@vanilla-extract/css";

export const inputPageStyle = style({
  padding: "48px 16px 120px",
});

export const inputPageContentStyle = style({
  maxWidth: 800,
  margin: "0 auto",
});

export const inputPageItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});

export const inputPageFormItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});
