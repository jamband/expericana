import styles from "./style.module.scss";

export const Component: React.VFC = () => (
  <div className={styles.loading} role="status">
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
);
