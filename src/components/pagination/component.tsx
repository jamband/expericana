import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./style.module.scss";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <nav className={props.className} aria-label="Page navigation">
    <ul className="pagination">
      <li className={props.itemClass("first")}>
        <Link href={props.link("first")}>
          <a
            className={props.linkClass()}
            aria-label="First"
            aria-disabled={props.disabled("first")}
            tabIndex={props.disabled("first") ? -1 : 0}
            onClickCapture={props.blur}
          >
            <FontAwesomeIcon icon={["fas", "angle-double-left"]} />
          </a>
        </Link>
      </li>
      <li className={props.itemClass("previous")}>
        <Link href={props.link("previous")}>
          <a
            className={props.linkClass()}
            aria-label="Previous"
            aria-disabled={props.disabled("previous")}
            tabIndex={props.disabled("previous") ? -1 : 0}
            onClickCapture={props.blur}
          >
            <FontAwesomeIcon icon={["fas", "angle-left"]} />
          </a>
        </Link>
      </li>
      <li className={props.itemClass("next")}>
        <Link href={props.link("next")}>
          <a
            className={props.linkClass()}
            aria-label="Next"
            aria-disabled={props.disabled("next")}
            tabIndex={props.disabled("next") ? -1 : 0}
            onClickCapture={props.blur}
          >
            <FontAwesomeIcon icon={["fas", "angle-right"]} />
          </a>
        </Link>
      </li>
      <li className={props.itemClass("last")}>
        <Link href={props.link("last")}>
          <a
            className={props.linkClass()}
            aria-label="Last"
            aria-disabled={props.disabled("last")}
            tabIndex={props.disabled("last") ? -1 : 0}
            onClickCapture={props.blur}
          >
            <FontAwesomeIcon icon={["fas", "angle-double-right"]} />
          </a>
        </Link>
      </li>
    </ul>
    <div className={styles.information} aria-label="Page information">
      {props.currentPage}/{props.total}
    </div>
  </nav>
);
