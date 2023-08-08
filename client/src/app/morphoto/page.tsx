import { SearchBar } from "@/ui";

import * as styles from "./morphoto-page.css";
import { Morphotos } from "./_component";

const MorphotoPage = () => {
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
          {/* @ts-expect-error Server Component */}
          <Morphotos />
        </div>
      </div>
    </div>
  );
};

export default MorphotoPage;
