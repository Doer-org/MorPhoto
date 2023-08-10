import { indigo } from "@radix-ui/colors";
import { style } from "@vanilla-extract/css";

const base = style({
  padding: "12px 0",
  color: "white",
});

export const inputButtonStyle = style([
  base,
  {
    background: "linear-gradient(90deg, #793AAF, #3451B2)",
    border: "none",
    borderRadius: "0.5rem",
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    ":hover": {
      background: "linear-gradient(90deg, #2B0E44, #101D46)",
    },
  },
]);
