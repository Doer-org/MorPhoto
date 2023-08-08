import { SearchBar } from "@/ui";

import * as styles from "./morphotos-page.css";
import { Morphotos } from "./_component";

export default function MorphotosPage() {
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
}
