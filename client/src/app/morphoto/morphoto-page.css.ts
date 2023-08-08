import { style } from "@vanilla-extract/css";
import { blueDark } from "@radix-ui/colors";

export const pageStyle = style({
  padding: "18px 16px 120px",
});

export const pageContentStyle = style({
  maxWidth: 800,
  margin: "0 auto",
});

export const pageItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});
