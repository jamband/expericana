import type { _Props } from "./types";
import styles from "./style.module.scss";

export const Component: React.VFC<_Props> = (props) => (
  <h6 className={`dropdown-header mb-1 ${styles.header}`}>{props.children}</h6>
);
