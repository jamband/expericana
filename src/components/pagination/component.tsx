import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./style.module.scss";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <nav className={props.className} aria-label="Page navigation">
    <div className="d-flex" onClick={props.blur} role="presentation">
      <Link href={props.link("first")}>
        <a
          className={`flex-fill py-2 ${styles.first} ${styles.touch} ${
            !props.hasTouchScreen && styles.link
          } ${props.disabled("first") && styles.disabled}`}
          aria-label="First"
          aria-disabled={props.disabled("first")}
          tabIndex={props.disabled("first") ? -1 : 0}
        >
          <FontAwesomeIcon icon={["fas", "angle-double-left"]} />
        </a>
      </Link>
      <Link href={props.link("previous")}>
        <a
          className={`flex-fill py-2 ${styles.touch} ${
            !props.hasTouchScreen && styles.link
          } ${props.disabled("previous") && styles.disabled}`}
          aria-label="Previous"
          aria-disabled={props.disabled("previous")}
          tabIndex={props.disabled("previous") ? -1 : 0}
        >
          <FontAwesomeIcon icon={["fas", "angle-left"]} />
        </a>
      </Link>
      <Link href={props.link("next")}>
        <a
          className={`flex-fill py-2 ${styles.touch} ${
            !props.hasTouchScreen && styles.link
          } ${props.disabled("next") && styles.disabled}`}
          aria-label="Next"
          aria-disabled={props.disabled("next")}
          tabIndex={props.disabled("next") ? -1 : 0}
        >
          <FontAwesomeIcon icon={["fas", "angle-right"]} />
        </a>
      </Link>
      <Link href={props.link("last")}>
        <a
          className={`flex-fill py-2 ${styles.last} ${styles.touch} ${
            !props.hasTouchScreen && styles.link
          } ${props.disabled("last") && styles.disabled}`}
          aria-label="Last"
          aria-disabled={props.disabled("last")}
          tabIndex={props.disabled("last") ? -1 : 0}
        >
          <FontAwesomeIcon icon={["fas", "angle-double-right"]} />
        </a>
      </Link>
    </div>
    <div className={styles.information} aria-label="Page information">
      {props.currentPage}/{props.total}
    </div>
  </nav>
);
