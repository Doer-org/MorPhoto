import * as styles from "./title.css";

export const Title = () => {
  return (
    <h2 className={styles.titleVariantStyle["default"]}>
      Let{"'"}s start
      <br />
      <span className={styles.titleVariantStyle["primary"]}>morphing!</span>
    </h2>
  );
};
