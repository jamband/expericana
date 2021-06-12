import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <div className={props.className}>
    <a
      href="#"
      role="button"
      id={props.id}
      className={props.labelClass}
      data-bs-toggle="dropdown"
      aria-expanded={false}
    >
      {props.label ? (
        <>
          {props.label}{" "}
          <FontAwesomeIcon icon={["fas", "angle-down"]} size="sm" fixedWidth />
        </>
      ) : (
        <FontAwesomeIcon icon={["fas", "ellipsis-h"]} size="sm" fixedWidth />
      )}
    </a>
    <section className="dropdown-menu" aria-labelledby={props.id} role="list">
      {props.children}
    </section>
  </div>
);
