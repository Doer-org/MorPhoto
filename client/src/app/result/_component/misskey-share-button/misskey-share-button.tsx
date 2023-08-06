import { ComponentPropsWithoutRef, forwardRef } from "react";
import Image from "next/image";

import * as styles from "./misskey-share-button.css";

type Props = ComponentPropsWithoutRef<"a"> & {
  title?: string;
  text?: string;
  url?: string;
  replyId?: string;
  replyUri?: string;
  renoteId?: string;
  renoteUri?: string;
  visibility?: "public" | "home" | "followers" | "specified";
  localOnly?: boolean;
  visibleUserIds?: string[];
  visibleAccts?: string[];
};

export const MisskeyShareButton = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      title,
      text,
      url,
      replyId,
      replyUri,
      renoteId,
      renoteUri,
      visibility,
      localOnly,
      visibleUserIds,
      visibleAccts,
      ...props
    },
    ref
  ) => {
    const _url = new URL("https://misskey.io/share");

    if (title) {
      _url.searchParams.set("title", title);
    }
    if (text) {
      _url.searchParams.set("text", text);
    }
    if (url) {
      _url.searchParams.set("url", url);
    }
    if (replyId) {
      _url.searchParams.set("replyId", replyId);
    }
    if (replyUri) {
      _url.searchParams.set("replyUri", replyUri);
    }
    if (renoteId) {
      _url.searchParams.set("renoteId", renoteId);
    }
    if (renoteUri) {
      _url.searchParams.set("renoteUri", renoteUri);
    }
    if (visibility) {
      _url.searchParams.set("visibility", visibility);
    }
    if (localOnly) {
      _url.searchParams.set("localOnly", Number(localOnly).toString());
    }
    if (visibleUserIds) {
      _url.searchParams.set("visibleUserIds", visibleUserIds.join(","));
    }
    if (visibleAccts) {
      _url.searchParams.set("visibleAccts", visibleAccts.join(","));
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
            src={"/assets/sns/misskey.png"}
            width={32}
            height={32}
            alt="misskey"
          />
        </div>
      </a>
    );
  }
);

MisskeyShareButton.displayName = "MisskeyShareButton";
