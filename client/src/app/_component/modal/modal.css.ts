import { style } from "@vanilla-extract/css";
import { grayDark, sageDark } from "@radix-ui/colors";

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
  padding: "0 16px",
});

export const modalContent = style({
  position: "relative",
  maxWidth: "600px",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: grayDark.gray6,
  margin: "64px auto",
  padding: "52px 20px 20px 20px",
  borderRadius: "10px",
  color: "white",
});

export const modalClose = style({
  borderRadius: "100%",
  border: "none",
  outline: "none",
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
  transition: "background-color .2s ease",
  ":hover": {
    backgroundColor: sageDark.sage10,
  },
});

export const modalCloseIcon = style({
  width: 20,
  height: 20,
});
