import { style } from "@vanilla-extract/css";
import { blueDark } from "@radix-ui/colors";

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
  color: blueDark.blue7,
});
