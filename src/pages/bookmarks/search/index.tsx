import type { GetServerSideProps } from "next";
import View from "~/pages/bookmarks";
import type { Bookmark } from "~/types/bookmark";
import type { Pagination } from "~/types/pagination";
import { http } from "~/utils/http";

type Props = {
  bookmarks: Bookmark[];
  pagination: Pagination;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const response = await http({
    url: "/bookmarks/search?expand=tags",
    params: query,
  });

  const bookmarks = await response.json();

  return {
    props: {
      bookmarks: bookmarks.items,
      pagination: bookmarks._meta,
    },
  };
};

export default View;
