import { style } from "@vanilla-extract/css";

export const inputPageContentStyle = style({
  maxWidth: 800,
});

export const inputPageItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});
