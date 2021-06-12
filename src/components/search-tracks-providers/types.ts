import type { UrlObject } from "url";

export type _Props = {
  label: string;
  resetLink: UrlObject;
  itemLink: (provider: string) => UrlObject;
};
