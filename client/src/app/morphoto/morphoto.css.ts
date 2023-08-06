import { style } from "@vanilla-extract/css";
import { blueDark } from "@radix-ui/colors";

export const pageStyle = style({
  padding: "18px 16px 120px",
});

export const pageContentStyle = style({
  maxWidth: 800,
  margin: "0 auto",
});

export const pageItemStyle = style({
  marginTop: 18,
  ":first-child": {
    marginTop: 0,
  },
});

export const pageHeadingStyle = style({
  fontSize: 42,
  fontWeight: 700,
});

export const pageHeadingBlueStyle = style({
  color: blueDark.blue7,
});

export const imageListStyle = style({
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(2, 1fr)",
  "@media": {
    "screen and (min-width: 600px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const imageWrapperStyle = style({
  position: "relative",
  aspectRatio: "1",
});

export const imageStyle = style({
  borderRadius: 10,
  objectFit: "cover",
});
