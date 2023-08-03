import { style } from "@vanilla-extract/css";
import { oliveDark } from "@radix-ui/colors";

export const modalOverlay = style({
  backgroundColor: "rgba(0 0 0 / 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "scroll",
});

export const modalContent = style({
  position: "relative",
  maxWidth: "600px",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: oliveDark.olive2,
  margin: "64px auto",
  padding: "44px 20px 20px 20px",
  borderRadius: "10px",
  color: "white",
});

export const modalClose = style({
  borderRadius: "100%",
  border: "none",
  width: "24px",
  height: "24px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  backgroundColor: "transparent",
  position: "absolute",
  top: "20px",
  right: "20px",
  padding: 0,
  ":hover": {
    backgroundColor: oliveDark.olive8,
  },
});
