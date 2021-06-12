import { useRouter } from "next/router";
import { Component } from "./component";
import { useLabelsCountries } from "~/hooks/query";
import { UrlObject } from "url";
import { useLinkResetQuery } from "~/hooks/link";

export const SearchLabelsCountries: React.VFC = () => {
  const { pathname, query } = useRouter();
  const label = query.country?.toString() || "Countries";

  const resetLink: UrlObject = {
    pathname,
    query: useLinkResetQuery("country"),
  };

  const { data, error, isLoading } = useLabelsCountries();

  const itemLink = (country: string): UrlObject => {
    const q = Object.assign({}, query);
    delete q.page;

    return {
      pathname,
      query: { ...q, country },
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
