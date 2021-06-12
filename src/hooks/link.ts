import { useRouter } from "next/router";

export const useLinkResetQuery = (key: string) => {
  const { query: originalQuery } = useRouter();
  const query = Object.assign({}, originalQuery);

  delete query.page;
  delete query[key];

  return query;
};
