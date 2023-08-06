import { ComponentPropsWithoutRef, forwardRef } from "react";
import Image from "next/image";

import * as styles from "./twitter-share-button.css";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "target" | "rel"> & {
  text?: string;
  url?: string;
  hashtags?: string[];
  via?: string;
  related?: string[];
  in_reply_to?: string;
};

export const TwitterShareButton = forwardRef<HTMLAnchorElement, Props>(
  ({ text, url, hashtags, via, related, in_reply_to, ...props }, ref) => {
    const _url = new URL("https://twitter.com/intent/tweet");

    if (text) {
      _url.searchParams.set("text", text);
    }
    if (url) {
      _url.searchParams.set("url", url);
    }
    if (hashtags) {
      _url.searchParams.set("hashtags", hashtags.join(","));
    }
    if (via) {
      _url.searchParams.set("via", via);
    }
    if (related) {
      _url.searchParams.set("related", related.join(","));
    }
    if (in_reply_to) {
      _url.searchParams.set("in_reply_to", in_reply_to);
    }

    return (
      <a
        className={styles.linkStyle}
        href={_url.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        ref={ref}
      >
        <div className={styles.iconWrapperStyle}>
          <Image
            src={"/assets/sns/twitter.svg"}
            width={32}
            height={32}
            alt="twitter"
          />
        </div>
      </a>
    );
  }
);

TwitterShareButton.displayName = "TwitterShareButton";
