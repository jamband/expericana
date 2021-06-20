import type { GetServerSideProps } from "next";
import type { Pagination } from "~/types/pagination";
import { Track } from "~/types/track";
import { http } from "~/utils/http";
import View from "~/pages/tracks";

type Props = {
  tracks: Track[];
  pagination: Pagination;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const response = await http({
    url: "/tracks/search?expand=genres",
    params: query,
  });

  const tracks = await response.json();

  return {
    props: {
      tracks: tracks.items,
      pagination: tracks._meta,
    },
  };
};

export default View;
