import { Component } from "./component";
import type { Props } from "./types";

export const DropdownLink: React.VFC<Props> = (props) => {
  const resetScrollTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const element = event.target as HTMLAnchorElement;
    const parentElement = element.parentNode as HTMLDivElement;
    parentElement.scrollTop = 0;
  };

  return <Component {...props} resetScrollTop={resetScrollTop} />;
};
