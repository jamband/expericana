import { useRouter } from "next/router";
import { Component } from "./component";
import { useBookmarksCountries } from "~/hooks/query";

export const SearchBookmarksCountries: React.VFC = () => {
  const { query } = useRouter();
  const label = query.country?.toString() || "Countries";

  const { data, error, isLoading } = useBookmarksCountries();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
