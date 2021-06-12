import type { UrlObject } from "url";

export type Props = {
  href: string | UrlObject;
  children: React.ReactNode;
};

export type _Props = Props & {
  resetScrollTop: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};
