import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect } from "react";
import { usePlayerAction } from "~/hooks/player";
import { Page } from "~/layouts/page";
import type { Playlist } from "~/types/playlist";
import { http } from "~/utils/http";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await http({
    url: "/playlists",
  });

  const { items } = await response.json();

  const paths = items.map((playlist: Playlist) => ({
    params: { id: playlist.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

type Props = {
  playlist: Playlist;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const response = await http({
    url: `/playlists/${params?.id}`,
  });

  const playlist = await response.json();

  return {
    props: {
      playlist,
    },
  };
};

export default function View(props: Props) {
  const { play } = usePlayerAction();

  useEffect(() => {
    play({
      id: props.playlist.id,
      title: props.playlist.title,
      provider: props.playlist.provider,
      provider_key: props.playlist.provider_key,
      type: "playlist",
      loading: true,
    });
  }, [play, props.playlist]);

  return (
    <Page title={props.playlist.title}>
      <div />
    </Page>
  );
}
