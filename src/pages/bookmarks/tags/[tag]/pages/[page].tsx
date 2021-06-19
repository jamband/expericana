import type { GetStaticPaths } from "next";
import type { ParsedUrlQuery } from "querystring";
import View, { getStaticProps } from "~/pages/bookmarks";
import type { Pagination } from "~/types/pagination";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({ url: "/bookmarks/tags" });
  const tags = await response.json();

  const paths: Array<{ params: ParsedUrlQuery }> = [];

  for (let i = 0; i <= tags.length; ++i) {
    const response = await http({ url: `/bookmarks?tag=${tags[i]}` });
    const { _meta }: { _meta: Pagination } = await response.json();

    [...Array(_meta.pageCount)].map((_, n) => {
      paths.push({ params: { tag: tags[i], page: `${n + 1}` } });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export { getStaticProps };

export default View;
