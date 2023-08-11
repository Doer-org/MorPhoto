import { style, styleVariants } from "@vanilla-extract/css";
import { blackA } from "@radix-ui/colors";

export const wrapperVariantStyle = styleVariants({
  default: [{ pointerEvents: "auto" }],
  disabled: [{ pointerEvents: "none" }],
});

const labelBase = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  borderRadius: 10,
  transition: "background-color 0.3s ease",
  ":hover": {
    backgroundColor: blackA.blackA6,
  },
});
export const labelVariantStyle = styleVariants({
  default: [
    labelBase,
    {
      backgroundColor: "transparent",
    },
  ],
  drag: [
    labelBase,
    {
      backgroundColor: blackA.blackA6,
    },
  ],
});

export const inputStyle = style({
  display: "none",
});
