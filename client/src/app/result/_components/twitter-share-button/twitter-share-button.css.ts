import { style } from "@vanilla-extract/css";
import { slate } from "@radix-ui/colors";

export const linkStyle = style({
  borderRadius: "50%",
  ":hover": {
    backgroundColor: slate.slate6,
  },
});

export const iconWrapperStyle = style({
  width: 44,
  height: 44,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
});
