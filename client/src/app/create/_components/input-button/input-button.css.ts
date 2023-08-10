import { indigo } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

const base = style({
  padding: "12px 0",
  color: "white",
});

export const inputButtonStyle = style([
  base,
  {
    backgroundColor: indigo.indigo11,
    border: "none",
    borderRadius: "0.5rem",
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    ":hover": {
      backgroundColor: indigo.indigo12,
    },
  },
]);
