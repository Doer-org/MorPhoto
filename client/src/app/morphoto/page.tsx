import { Suspense } from "react";
import { Morphotos, Title, SearchBar } from "./_components";

import * as styles from "./morphoto-page.css";

export default function MorphotoPage() {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.pageContentStyle}>
        <div className={styles.pageItemStyle}>
          <Title />
        </div>
        <div className={styles.pageItemStyle}>
          <SearchBar />
        </div>
        <div className={styles.pageItemStyle}>
          <Suspense>
            {/* @ts-expect-error Async Server Component */}
            <Morphotos />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
