import { ParsedUrlQueryInput } from "querystring";

export type Part = "first" | "previous" | "next" | "last";

export type Props = {
  className?: string;
  currentPage: number;
  total: number;
};

export type _Props = Props & {
  itemClass: (part: Part) => string;
  link: (part: Part) => { pathname: string; query: ParsedUrlQueryInput };
  linkClass: () => string;
  disabled: (part: Part) => boolean;
  blur: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};
