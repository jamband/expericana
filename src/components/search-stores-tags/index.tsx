import { useRouter } from "next/router";
import type { UrlObject } from "url";
import { Component } from "./component";
import { useStoresTags } from "~/hooks/query";
import { useLinkResetQuery } from "~/hooks/link";

export const SearchStoresTags: React.VFC = () => {
  const { pathname, query } = useRouter();
  const label = query.tags?.toString() || "Tags";

  const resetLink: UrlObject = {
    pathname,
    query: useLinkResetQuery("tag"),
  };

  const { data, error, isLoading } = useStoresTags();

  const itemLink = (tag: string): UrlObject => {
    const q = Object.assign({}, query);
    delete q.page;

    return {
      pathname,
      query: { ...q, tag },
    };
  };

  return (
    <Component
      label={label}
      resetLink={resetLink}
      data={data}
      error={error}
      isLoading={isLoading}
      itemLink={itemLink}
    />
  );
};
