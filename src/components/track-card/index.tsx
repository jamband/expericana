import { usePlayerState } from "~/hooks/player";
import { Component } from "./component";
import type { Props } from "./types";

export const TrackCard: React.VFC<Props> = (props) => {
  const player = usePlayerState();

  const ratioSelector = ["Bandcamp", "SoundCloud"].includes(props.provider)
    ? "ratio ratio-1x1"
    : "ratio ratio-16x9";

  const ratio = ["Bandcamp", "SoundCloud"].includes(props.provider)
    ? "1/1"
    : "16/9";

  const audioStatusIcon =
    props.id === player.id ? "pause-circle" : "play-circle";

  return (
    <Component
      {...props}
      ratioSelector={ratioSelector}
      ratio={ratio}
      audioStatusIcon={audioStatusIcon}
    />
  );
};
