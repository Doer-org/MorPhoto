import { style, styleVariants } from "@vanilla-extract/css";
import { blackA } from "@radix-ui/colors";

const uploadCardLabelBase = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  borderRadius: 10,
  transition: "background-color 0.3s ease",
  ":hover": {
    backgroundColor: blackA.blackA8,
  },
});
export const uploadCardLabelVariantStyle = styleVariants({
  default: [
    uploadCardLabelBase,
    {
      backgroundColor: "transparent",
    },
  ],
  drag: [
    uploadCardLabelBase,
    {
      backgroundColor: blackA.blackA8,
    },
  ],
});

export const uploadCardInputStyle = style({
  display: "none",
});
