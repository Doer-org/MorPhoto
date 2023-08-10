import { style, styleVariants } from "@vanilla-extract/css";
import { slate, blackA } from "@radix-ui/colors";

export const headerStyle = style({});

export const titleStyle = style({
  fontSize: 16,
  fontWeight: "bold",
});

export const contentStyle = style({
  marginTop: 8,
});

const textareaBase = style({
  display: "block",
  width: "100%",
  height: 68,
  resize: "none",
  fontSize: 16,
  color: slate.slate11,
  border: "none",
  outline: "none",
  transition: "background-color 0.3s ease",
});
export const textareaVariantStyle = styleVariants({
  default: [
    textareaBase,
    {
      ":hover": {
        backgroundColor: blackA.blackA8,
      },
    },
  ],
  onfocus: [textareaBase],
});
