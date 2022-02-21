import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type Props = {
  link: string;
};

export type _Props = Props & {
  links: string[];
  icon: (link: string) => IconProp;
};
