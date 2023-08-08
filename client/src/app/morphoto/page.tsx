import { SearchBar } from "@/ui";
import { Morphotos, Title } from "./_components";

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
          {/* @ts-expect-error Server Component */}
          <Morphotos />
        </div>
      </div>
    </div>
  );
}
