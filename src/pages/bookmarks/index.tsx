import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LinkBrandIcon } from "~/components/link-brand-icon";
import { Pagination } from "~/components/pagination";
import { Pagination as PaginationSG } from "~/components/pagination-static";
import { SearchBookmarksCountries } from "~/components/search-bookmarks-countries";
import { SearchBookmarksTags } from "~/components/search-bookmarks-tags";
import { SearchForm } from "~/components/search-form";
import { TotalCount } from "~/components/total-count";
import { Page } from "~/layouts/page";
import type { Bookmark } from "~/types/bookmark";
import type { Pagination as PaginationProp } from "~/types/pagination";
import { http } from "~/utils/http";

type Props = {
  bookmarks: Bookmark[];
  pagination: PaginationProp;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await http({
    url: "/bookmarks?expand=tags",
    params,
  });

  const bookmarks = await response.json();

  return {
    props: {
      bookmarks: bookmarks.items,
      pagination: bookmarks._meta,
    },
  };
};

export default function View(props: Props) {
  const { pathname } = useRouter();

  return (
    <Page title="Bookmarks">
      <div className="row">
        <div className="col-lg-4">
          <h1 className="mt-0 mb-3">Bookmarks</h1>
          <Link href="/bookmarks">
            <a className="tag">
              <FontAwesomeIcon icon={["fas", "redo-alt"]} size="sm" /> Reset All
            </a>
          </Link>
          <TotalCount className="me-3" total={props.pagination.totalCount} />
          <br className="d-md-none d-lg-block" />
          <SearchBookmarksCountries />
          <SearchBookmarksTags />
          <SearchForm className="d-md-none mt-3" />
        </div>
        <div className="col-lg-8 mt-3 mt-lg-0">
          <div className="row">
            {props.bookmarks.map((bookmark, index) => (
              <article key={index} className="col-lg-6 mb-3">
                <section className="mb-1">
                  <a href={bookmark.url}>
                    <FontAwesomeIcon icon={["fas", "external-link-alt"]} />{" "}
                    <strong>{bookmark.name}</strong>
                  </a>
                </section>
                <section className="mb-1">
                  <span className="me-2">Country:</span>
                  {bookmark.country}
                </section>
                <section className="mb-1">
                  <span className="me-2">Links:</span>
                  <LinkBrandIcon link={bookmark.link} />
                </section>
                <section>
                  <span className="me-2">Tags:</span>
                  {bookmark.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/bookmarks/tags/${tag.name}/pages/1`}
                    >
                      <a className="tag">{tag.name}</a>
                    </Link>
                  ))}
                </section>
                <hr className="text-muted" />
              </article>
            ))}
          </div>
          {pathname === "/bookmarks/search" ? (
            <Pagination
              className="mt-2 mt-sm-4"
              currentPage={props.pagination.currentPage}
              total={props.pagination.pageCount}
            />
          ) : (
            <PaginationSG
              className="mt-2 mt-sm-4"
              currentPage={props.pagination.currentPage}
              total={props.pagination.pageCount}
            />
          )}
        </div>
      </div>
    </Page>
  );
}
