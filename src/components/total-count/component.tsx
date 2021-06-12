import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <span className={props.className}>
    <FontAwesomeIcon icon={["fas", "database"]} size="sm" fixedWidth />{" "}
    {props.total}
  </span>
);
