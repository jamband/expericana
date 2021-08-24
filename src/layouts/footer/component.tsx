import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { APP_NAME } from "~/constants/app";
import styles from "./style.module.scss";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <footer className="fixed-bottom p-3 text-center fw-bold bg-dark">
    {props.showPlayerTitle ? (
      <div className={styles.contents}>
        <FontAwesomeIcon icon={["fas", "volume-up"]} size="sm" fixedWidth />
        <Link href={props.playerUrl}>
          <a className={`mx-3 text-body ${styles.title}`}>
            {props.playerTitle}
          </a>
        </Link>
        <button
          type="button"
          className="btn-close btn-sm align-text-top"
          aria-label="Close"
          onClick={props.clear}
        />
      </div>
    ) : (
      <div className={styles.contents}>{APP_NAME}</div>
    )}
  </footer>
);
