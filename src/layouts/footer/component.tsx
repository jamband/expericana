import Link from "next/link";
import { APP_NAME } from "~/constants/app";
import styles from "./style.module.scss";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <footer
    className={`${styles.footer} fixed-bottom fw-bold bg-dark text-light`}
  >
    <div className={styles.contents}>
      {props.showPlayerTitle ? (
        <div className="p-2 d-flex align-items-center justify-content-center">
          <Link href={props.playerUrl}>
            <a className="py-2 px-1 text-light text-truncate">
              {props.playerTitle}
            </a>
          </Link>
          <button
            type="button"
            className="p-3 btn-close btn-sm"
            aria-label="Close"
            onClick={props.clear}
          />
        </div>
      ) : (
        <div className="p-3 text-center">{APP_NAME}</div>
      )}
    </div>
  </footer>
);
