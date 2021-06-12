import { useRouter } from "next/router";
import { Component } from "./component";
import { useLabelsTags } from "~/hooks/query";
import { UrlObject } from "url";
import { useLinkResetQuery } from "~/hooks/link";

export const SearchLabelsTags: React.VFC = () => {
  const { pathname, query } = useRouter();
  const label = query.tag?.toString() || "Tags";

  const resetLink: UrlObject = {
    pathname,
    query: useLinkResetQuery("tag"),
  };

  const { data, error, isLoading } = useLabelsTags();

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
