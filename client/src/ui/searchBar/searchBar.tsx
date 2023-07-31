import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";

import * as styles from "./searchBar.css";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { sageDark } from "@radix-ui/colors";

type Props = ComponentPropsWithRef<"input"> & {
  variant?: "default";
};

const _SearchBar = forwardRef(
  (
    { variant = "default", ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.searchBarStyle}>
        <MagnifyingGlassIcon
          className={styles.searchBarIconStyle}
          viewBox="2 2 11 11"
          color={sageDark.sage10}
          width={18}
          height={18}
        />
        <input ref={ref} {...props} className={styles.searchBarInputStyle} />
      </div>
    );
  }
);

_SearchBar.displayName = "SearchBar";

export const SearchBar = _SearchBar;
