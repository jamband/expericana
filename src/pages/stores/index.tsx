import { GetServerSideProps } from "next";
import Link from "next/link";
import { SearchStoresCountries } from "~/components/search-stores-countries";
import { SearchStoresTags } from "~/components/search-stores-tags";
import { LinkBrandIcon } from "~/components/link-brand-icon";
import { Pagination } from "~/components/pagination";
import { SearchForm } from "~/components/search-form";
import { TotalCount } from "~/components/total-count";
import { Page } from "~/layouts/page";
import type { Pagination as PaginationProp } from "~/types/pagination";
import type { Store } from "~/types/store";
import { http } from "~/utils/http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  stores: Store[];
  pagination: PaginationProp;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await http({
    url: context.query.q ? "/stores/search?expand=tags" : "/stores?expand=tags",
    params: context.query,
  });

  const stores = await response.json();

  return {
    props: {
      stores: stores.items,
      pagination: stores._meta,
    },
  };
};

export default function View(props: Props) {
  return (
    <Page title="Stores">
      <div className="row">
        <div className="col-lg-4">
          <h1 className="mt-0 mb-3">Stores</h1>
          <Link href="/stores">
            <a className="tag">
              <FontAwesomeIcon icon={["fas", "redo-alt"]} size="sm" /> Reset All
            </a>
          </Link>
          <TotalCount className="me-3" total={props.pagination.totalCount} />
          <br className="d-md-none d-lg-block" />
          <SearchStoresCountries />
          <SearchStoresTags />
          <SearchForm className="d-md-none my-2" />
        </div>
        <div className="col-lg-8 mt-md-3 mt-lg-0">
          <div className="row">
            {props.stores.map((store, index) => (
              <article key={index} className="col-lg-6 mb-3">
                <section className="mb-1">
                  <a href={store.url}>
                    <FontAwesomeIcon icon={["fas", "external-link-alt"]} />{" "}
                    <strong>{store.name}</strong>
                  </a>
                </section>
                <section className="mb-1">
                  <span className="me-2">Country:</span>
                  {store.country}
                </section>
                <section className="mb-1">
                  <span className="me-2">Link:</span>
                  <LinkBrandIcon link={store.link} />
                </section>
                <section>
                  <span className="me-2">Tag:</span>
                  {store.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={{ pathname: "/stores", query: { tag: tag.name } }}
                    >
                      <a className="tag">{tag.name}</a>
                    </Link>
                  ))}
                </section>
                <hr className="text-muted" />
              </article>
            ))}
          </div>
          <Pagination
            className="mt-2 mt-sm-4"
            currentPage={props.pagination.currentPage}
            total={props.pagination.pageCount}
          />
        </div>
      </div>
    </Page>
  );
}
