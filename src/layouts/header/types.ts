export type _Props = {
  collapseRef: React.RefObject<HTMLDivElement>;
  hideNavigation: () => void;
  links: { href: string; text: string }[];
  moreLinks: { href: string; text: string }[];
  linkClass: (pathname: string) => string;
};
