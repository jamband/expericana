import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "./style.module.scss";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <div className={styles.card}>
    <Link href={`/tracks/${props.id}`}>
      <a className={`${styles.imagewrap} ${props.ratioSelector}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.image} src={props.image} alt="" loading="lazy" />
        <div className={styles.play}>
          <FontAwesomeIcon icon={["fas", props.audioStatusIcon]} />
        </div>
      </a>
    </Link>
    <div className={styles.body}>
      <h6 className={styles.title}>{props.title}</h6>
      <div className={styles.text}>{props.children}</div>
      <div className={styles.footer}>
        <FontAwesomeIcon icon={["fas", "clock"]} size="sm" fixedWidth />{" "}
        {props.footer}
      </div>
    </div>
  </div>
);
