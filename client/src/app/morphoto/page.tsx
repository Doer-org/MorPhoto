import { ReactNode } from "react";
import { SearchBar } from "@/ui";
import Image from "next/image";

import * as styles from "./morphoto.css";

const Page = () => {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.pageContentStyle}>
        <div className={styles.pageItemStyle}>
          <h2 className={styles.pageHeadingStyle}>
            Find a <span className={styles.pageHeadingBlueStyle}>Photo!</span>
          </h2>
        </div>
        <div className={styles.pageItemStyle}>
          <SearchBar />
        </div>
        <div className={styles.pageItemStyle}>
          <div className={styles.imageListStyle}>
            {(() => {
              const photos: ReactNode[] = [];
              for (let i = 0; i < 10; i++) {
                photos.push(
                  <div className={styles.imageWrapperStyle}>
                    <Image
                      className={styles.imageStyle}
                      src={"/assets/nijika2.png"}
                      fill
                      alt="morphoto"
                    />
                  </div>
                );
              }
              return photos;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
