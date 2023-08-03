import { style } from "@vanilla-extract/css";
import { sageDark } from "@radix-ui/colors";

export const promptCardStyle = style({});

export const promptCardHeaderStyle = style({});

export const promptCardTitleStyle = style({
  fontSize: 16,
  fontWeight: "bold",
});

export const promptCardContentStyle = style({
  marginTop: 8,
});

export const promptCardInputStyle = style({
  display: "block",
  width: "100%",
  height: 68,
  resize: "none",
  fontSize: 16,
  padding: 8,
  color: sageDark.sage10,
});
