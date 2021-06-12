import type {
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-common-types";

export type Props = {
  link: string;
};

export type _Props = Props & {
  links: string[];
  icon: (link: string) => [IconPrefix, IconName];
};
