import { useRouter } from "next/router";
import { Component } from "./component";
import { useStoresCountries } from "~/hooks/query";

export const SearchStoresCountries: React.VFC = () => {
  const { query } = useRouter();
  const label = query.country?.toString() || "Countries";

  const { data, error, isLoading } = useStoresCountries();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
