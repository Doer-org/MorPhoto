import * as styles from "./title.css";

export const Title = () => {
  return (
    <h2 className={styles.titleStyle}>
      Find a <span className={styles.titleBlueStyle}>Photo!</span>
    </h2>
  );
};
