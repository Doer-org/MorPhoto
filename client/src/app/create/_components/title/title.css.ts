import { style, styleVariants } from "@vanilla-extract/css";
import { indigo, slate } from "@radix-ui/colors";

const base = style({ fontSize: 42 });

export const titleVariantStyle = styleVariants({
  default: [
    base,
    {
      color: slate.slate12,
    },
  ],
  primary: [
    base,
    {
      color: indigo.indigo11,
    },
  ],
});
