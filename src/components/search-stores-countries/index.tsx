import { useRouter } from "next/router";
import type { UrlObject } from "url";
import { Component } from "./component";
import { useStoresCountries } from "~/hooks/query";
import { useLinkResetQuery } from "~/hooks/link";

export const SearchStoresCountries: React.VFC = () => {
  const { pathname, query } = useRouter();
  const label = query.country?.toString() || "Countries";

  const resetLink: UrlObject = {
    pathname,
    query: useLinkResetQuery("country"),
  };

  const { data, error, isLoading } = useStoresCountries();

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
      itemLink={itemLink}
      data={data}
      error={error}
      isLoading={isLoading}
    />
  );
};
