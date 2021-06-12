import { useEffect } from "react";
import { Component } from "./component";
import type { Props } from "./types";

export const Dropdown: React.VFC<Props> = (props) => {
  let className = "dropdown";
  if (props.className) {
    className += ` ${props.className}`;
  }

  const labelClass = props.nav ? "nav-link" : "tag";

  useEffect(() => {
    import("bootstrap/js/dist/dropdown");
  }, []);

  return <Component {...props} className={className} labelClass={labelClass} />;
};
