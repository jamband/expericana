import { _Props } from "./types";

export const Component: React.VFC<_Props> = (props) => (
  <span className={props.className}>{props.total}</span>
);
