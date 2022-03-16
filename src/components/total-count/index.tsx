import { Component } from "./component";
import { Props } from "./types";

export const TotalCount: React.VFC<Props> = (props) => {
  let className = "text-secondary";

  if (props.className) {
    className += ` ${props.className}`;
  }

  const total = props.total
    ? `${new Intl.NumberFormat("en-US").format(props.total)} results`
    : "No results found";

  return <Component className={className} total={total} />;
};
