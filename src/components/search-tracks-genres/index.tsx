import { useRouter } from "next/router";
import type { UrlObject } from "url";
import { useTracksGenres } from "~/hooks/query";
import { useLinkResetQuery } from "~/hooks/link";
import { Component } from "./component";

export const SearchTracksGenres: React.VFC = () => {
  const { pathname, query } = useRouter();
  const label = query.genre?.toString() || "Genres";

  const resetLink: UrlObject = {
    pathname,
    query: useLinkResetQuery("genre"),
  };

  const { data, error, isLoading } = useTracksGenres();

  const itemLink = (genre: string): UrlObject => {
    const q = Object.assign({}, query);
    delete q.page;

    return {
      pathname,
      query: { ...q, genre },
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
