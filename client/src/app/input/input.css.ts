import { style, styleVariants } from "@vanilla-extract/css";
import { sageDark, blueDark, blackA } from "@radix-ui/colors";

export const inputPageStyle = style({
  padding: "48px 16px 0",
});

export const inputPageContentStyle = style({
  maxWidth: 800,
  margin: "0 auto",
});

export const inputPageItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});

const inputPageHeadingBase = style({ fontSize: 42 });
export const inputPageHeadingVariantStyle = styleVariants({
  default: [
    inputPageHeadingBase,
    {
      color: "white",
    },
  ],
  primary: [
    inputPageHeadingBase,
    {
      color: blueDark.blue7,
    },
  ],
});

export const inputPageFormItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});

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

export const uploadCardStyle = style({});

export const uploadCardHeaderStyle = style({});

export const uploadCardTitleStyle = style({
  fontSize: 16,
  fontWeight: "bold",
});

export const uploadCardContentStyle = style({
  marginTop: 8,
});

export const uploadCardItemStyle = style({
  marginTop: 12,
  ":first-child": {
    marginTop: 0,
  },
});

export const uploadCardImageListStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "12px 0",
});

export const uploadCardImageWrapperStyle = style({
  position: "relative",
  height: 240,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const uploadCardImageStyle = style({
  objectFit: "contain",
});

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

export const uploadCardSliderHeaderStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const uploadCardSliderInputStyle = style({
  marginTop: 8,
});
