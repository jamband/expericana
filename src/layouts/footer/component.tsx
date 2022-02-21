import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { APP_NAME } from "~/constants/app";
import styles from "./style.module.scss";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <footer className="fixed-bottom fw-bold bg-dark">
    <div className={styles.contents}>
      {props.showPlayerTitle ? (
        <div className="p-2 d-flex align-items-center justify-content-center">
          <FontAwesomeIcon
            icon={["fas", "volume-up"]}
            size="sm"
            className="mx-3"
          />
          <Link href={props.playerUrl}>
            <a className="py-2 px-1 text-body text-truncate">
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
