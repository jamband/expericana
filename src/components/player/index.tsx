import { useRouter } from "next/router";
import { APP_PRIMARY_COLOR } from "~/constants/app";
import { usePlayerAction, usePlayerState } from "~/hooks/player";
import { Component } from "./component";

export const Player: React.VFC = () => {
  const { pathname } = useRouter();
  const player = usePlayerState();
  const { loading } = usePlayerAction();

  if (player.id === "") {
    return null;
  }

  const display = ["/tracks/[id]", "/playlists/[id]"].includes(pathname)
    ? ""
    : "none";

  const is1x1Ratio = ["Bandcamp", "SoundCloud"].includes(player.provider);

  let src = "";

  if (player.provider === "Bandcamp") {
    src = "https://bandcamp.com/EmbeddedPlayer";
    const params = `size=large/tracklist=false/bgcol=333333/linkcol=${APP_PRIMARY_COLOR}`;
    src +=
      player.type === "track"
        ? `/track=${player.provider_key}/${params}`
        : `/album=${player.provider_key}/${params}`;
  }

  if (player.provider === "SoundCloud") {
    src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com";
    const params = `show_comments=false&color=${APP_PRIMARY_COLOR}&hide_related=true`;
    src +=
      player.type === "track"
        ? `/tracks/${player.provider_key}&${params}&visual=true`
        : `/playlists/${player.provider_key}&${params}&show_playcount=false`;
  }

  if (player.provider === "Vimeo") {
    src = `https://player.vimeo.com/video/${player.provider_key}`;
  }

  if (player.provider === "YouTube") {
    src = "https://www.youtube.com/embed";
    const params = "playsinline=1&rel=0";
    src +=
      player.type === "track"
        ? `/${player.provider_key}?${params}`
        : `/videoseries?list=${player.provider_key}&${params}`;
  }

  const backTo = player.type === "track" ? "/tracks" : "/playlists";
  const backToText = player.type === "track" ? "Tracks" : "Playlists";

  return (
    <Component
      display={display}
      is1x1Ratio={is1x1Ratio}
      player={player}
      src={src}
      setLoading={loading}
      backTo={backTo}
      backToText={backToText}
    />
  );
};
