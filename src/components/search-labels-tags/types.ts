import type { UrlObject } from "url";

export type _Props = {
  label: string;
  resetLink: UrlObject;
  isLoading: boolean;
  error: Error | null;
  data?: string[];
  itemLink: (tag: string) => UrlObject;
};
