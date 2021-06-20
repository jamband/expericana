import type { GetStaticPaths } from "next";
import type { ParsedUrlQuery } from "querystring";
import { MUSIC_PROVIDERS as PROVIDERS } from "~/constants/music";
import View, { getStaticProps } from "~/pages/tracks";
import type { Pagination } from "~/types/pagination";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<{ params: ParsedUrlQuery }> = [];

  for (let i = 0; i < PROVIDERS.length; ++i) {
    const response = await http({ url: `/tracks?provider=${PROVIDERS[i]}` });
    const { _meta }: { _meta: Pagination } = await response.json();

    [...Array(_meta.pageCount)].map((_, n) => {
      paths.push({ params: { provider: PROVIDERS[i], page: `${n + 1}` } });
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export { getStaticProps };

export default View;
