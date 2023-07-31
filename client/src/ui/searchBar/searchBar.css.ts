import { style } from "@vanilla-extract/css";
import { blueA, sageDark } from "@radix-ui/colors";

export const searchBarStyle = style({
  maxWidth: "600px",
  position: "relative",
});

export const searchBarIconStyle = style({
  position: "absolute",
  top: "50%",
  left: "18px",
  transform: "translateY(-50%)",
  pointerEvents: "none",
});

export const searchBarInputStyle = style({
  padding: "12px 18px 12px 48px",
  backgroundColor: "white",
  color: sageDark.sage10,
  border: "none",
  borderRadius: "10px",
  width: "100%",
  boxSizing: "border-box",
  fontSize: "14px",
  fontWeight: "normal",
  ":focus": {
    outline: `2px solid ${blueA.blueA11}`,
  },
});
