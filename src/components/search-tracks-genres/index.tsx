import { useRouter } from "next/router";
import { useTracksGenres } from "~/hooks/query";
import { Component } from "./component";

export const SearchTracksGenres: React.VFC = () => {
  const { query } = useRouter();
  const label = query.genre?.toString() || "Genres";

  const { data, error, isLoading } = useTracksGenres();

  return (
    <Component label={label} data={data} error={error} isLoading={isLoading} />
  );
};
