import { style } from "@vanilla-extract/css";

export const iconButtonStyle = style({
  width: "100%",
});

export const iconButtonContentStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
  width: "100%",
});

export const iconButtonIconStyle = style({
  width: 14,
  height: 14,
});

export const iconButtonLabelStyle = style({
  fontSize: 14,
  fontWeight: 600,
});
