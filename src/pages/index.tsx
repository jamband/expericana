import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetStaticProps } from "next";
import Link from "next/link";
import { TrackCard } from "~/components/track-card";
import { Page } from "~/layouts/page";
import type { Track } from "~/types/track";
import { http } from "~/utils/http";

type Props = {
  tracks: Track[];
  genres: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tracksResponse = await http({
    url: "/tracks/favorites?expand=genres",
  });

  const genresResponse = await http({
    url: "/tracks/minimal-genres?limit=38",
  });

  const tracks = await tracksResponse.json();
  const genres = await genresResponse.json();

  return {
    props: {
      tracks: tracks.items,
      genres: genres,
    },
  };
};

export default function View(props: Props) {
  return (
    <Page title="">
      <h1 className="mb-2">
        Recent <small className="fw-normal text-body">favorite tracks</small>
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-md-4">
        {props.tracks.map((track) => (
          <div key={track.id}>
            <TrackCard
              id={track.id}
              provider={track.provider}
              image={track.image}
              title={track.title}
              footer={track.created_at}
            >
              <Link href={`/tracks/providers/${track.provider}/pages/1`}>
                <a className="mb-2 tag">{track.provider}</a>
              </Link>
              {track.genres.map((genre, index) => (
                <Link key={index} href={`/tracks/genres/${genre.name}/pages/1`}>
                  <a className="mb-2 tag">{genre.name}</a>
                </Link>
              ))}
            </TrackCard>
          </div>
        ))}
      </div>
      <h1 className="mt-4 mb-2">
        Search <small className="fw-normal text-body">by genres</small>
      </h1>
      {props.genres.map((genre, index) => (
        <Link href={`/tracks/genres/${genre}/pages/1`} key={index}>
          <a className="mb-2 tag">{genre}</a>
        </Link>
      ))}
      <div className="text-center pt-3 pb-4">
        <Link href="/tracks">
          <a>Go to Tracks</a>
        </Link>
        <span className="mx-2">or</span>
        <Link href="/playlists">
          <a>
            Playlists{" "}
            <FontAwesomeIcon
              icon={["fas", "angle-right"]}
              size="sm"
              fixedWidth
            />
          </a>
        </Link>
      </div>
    </Page>
  );
}
