import { useRouter } from "next/router";
import type { UrlObject } from "url";
import { useLinkResetQuery } from "~/hooks/link";
import { Component } from "./component";

export const SearchTracksProviders: React.VFC = () => {
  const { pathname, query } = useRouter();
  const label = query.provider?.toString() || "Providers";

  const resetLink: UrlObject = {
    pathname,
    query: useLinkResetQuery("provider"),
  };

  const itemLink = (provider: string): UrlObject => {
    const q = Object.assign({}, query);
    delete q.page;

    return {
      pathname,
      query: { ...q, provider },
    };
  };

  return <Component label={label} resetLink={resetLink} itemLink={itemLink} />;
};
