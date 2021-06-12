import Link from "next/link";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <Link href={props.href}>
    <a
      className="dropdown-item"
      role="listitem"
      onClickCapture={props.resetScrollTop}
    >
      {props.children}
    </a>
  </Link>
);
