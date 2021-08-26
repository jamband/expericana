import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Page } from "~/layouts/page";
import type { Playlist } from "~/types/playlist";
import { http } from "~/utils/http";

type Props = {
  playlists: Playlist[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const response = await http({
    url: "/playlists",
  });

  const playlists = await response.json();

  return {
    props: {
      playlists: playlists.items,
    },
  };
};

export default function View(props: Props) {
  return (
    <Page title="Playlists">
      <div className="row">
        <div className="col-md-5 offset-md-1">
          <h1>
            Playlists{" "}
            <small className="text-muted">via SoundCloud or YouTube</small>
          </h1>
        </div>
        <div className="col-md-6">
          <ul className="list-unstyled text-truncate">
            {props.playlists.map((playlist) => (
              <li key={playlist.id} className="ms-1 mt-1 h5 fw-bold">
                <Link href={`/playlists/${playlist.id}`}>
                  <a>
                    {playlist.title}{" "}
                    <FontAwesomeIcon
                      icon={["fas", "angle-right"]}
                      size="sm"
                      fixedWidth
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
