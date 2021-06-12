import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { usePlayerAction } from "~/hooks/player";
import { Page } from "~/layouts/page";
import type { Track } from "~/types/track";
import { http } from "~/utils/http";

type Props = {
  track: Track;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const response = await http({
    url: `/tracks/${params?.id}`,
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const track = await response.json();

  return {
    props: {
      track,
    },
  };
};

export default function View(props: Props) {
  const { play } = usePlayerAction();

  useEffect(() => {
    play({
      id: props.track.id,
      title: props.track.title,
      provider: props.track.provider,
      provider_key: props.track.provider_key,
      type: "track",
      loading: true,
    });
  }, [play, props.track]);

  return (
    <Page title={props.track.title}>
      <div />
    </Page>
  );
}
