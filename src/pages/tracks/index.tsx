import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { TrackCard } from "~/components/track-card";
import { TotalCount } from "~/components/total-count";
import { SearchTracksGenres } from "~/components/search-tracks-genres";
import { SearchTracksProviders } from "~/components/search-tracks-providers";
import { Pagination } from "~/components/pagination";
import { useCardLayout } from "~/hooks/card-layout";
import { Page } from "~/layouts/page";
import type { Pagination as PaginationProps } from "~/types/pagination";
import { Track } from "~/types/track";
import { http } from "~/utils/http";

type Props = {
  tracks: Track[];
  pagination: PaginationProps;
  genres: string[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const tracksResponse = await http({
    url: context.query.q
      ? "/tracks/search?expand=genres"
      : "/tracks?expand=genres",
    params: context.query,
  });

  const genresResponse = await http({
    url: "/tracks/genres",
  });

  const tracks = await tracksResponse.json();
  const genres = await genresResponse.json();

  return {
    props: {
      tracks: tracks.items,
      pagination: tracks._meta,
      genres,
    },
  };
};

export default function View(props: Props) {
  const { cardContainerRef, cardLayout } = useCardLayout();

  return (
    <Page title="Tracks">
      <div className="text-center mb-4">
        <Link href="/tracks">
          <a className="tag">
            <FontAwesomeIcon icon={["fas", "redo-alt"]} size="sm" fixedWidth />{" "}
            Reset All
          </a>
        </Link>
        <TotalCount className="me-3" total={props.pagination.totalCount} />
        <br className="d-sm-none" />
        <SearchTracksProviders />
        <SearchTracksGenres />
      </div>
      <div
        ref={cardContainerRef}
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-md-4"
        onLoadCapture={cardLayout}
      >
        {props.tracks.map((track) => (
          <div key={track.id}>
            <TrackCard
              id={track.id}
              provider={track.provider}
              image={track.image}
              title={track.title}
              footer={track.created_at}
            >
              <Link href={`/tracks?provider=${track.provider}`}>
                <a className="tag">{track.provider}</a>
              </Link>
              {track.genres.map((genre, index) => (
                <Link key={index} href={`/tracks?genre=${genre.name}`}>
                  <a className="tag">{genre.name}</a>
                </Link>
              ))}
            </TrackCard>
          </div>
        ))}
      </div>
      <Pagination
        className="mt-4"
        currentPage={props.pagination.currentPage}
        total={props.pagination.pageCount}
      />
    </Page>
  );
}
