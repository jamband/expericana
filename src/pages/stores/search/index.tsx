import type { GetServerSideProps } from "next";
import View from "~/pages/stores";
import type { Store } from "~/types/store";
import type { Pagination } from "~/types/pagination";
import { http } from "~/utils/http";

type Props = {
  stores: Store[];
  pagination: Pagination;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const response = await http({
    url: "/stores/search?expand=tags",
    params: query,
  });

  const stores = await response.json();

  return {
    props: {
      stores: stores.items,
      pagination: stores._meta,
    },
  };
};

export default View;
