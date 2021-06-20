import { ParsedUrlQueryInput } from "querystring";

export type Part = "first" | "previous" | "next" | "last";

export type Props = {
  className?: string;
  currentPage: number;
  total: number;
};

export type _Props = Props & {
  hasTouchScreen: boolean;
  blur: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled: (part: Part) => boolean;
  link: (part: Part) => { pathname: string; query: ParsedUrlQueryInput };
};
