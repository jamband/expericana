import { Component } from "./component";
import { usePlayerAction, usePlayerState } from "~/hooks/player";
import { useRouter } from "next/router";

export const Footer: React.VFC = () => {
  const { pathname } = useRouter();
  const player = usePlayerState();
  const { clear } = usePlayerAction();

  const showPlayerTitle =
    player.id !== "" && !["/tracks/[id]", "/playlists/[id]"].includes(pathname);

  const playerUrl =
    player.type === "track"
      ? `/tracks/${player.id}`
      : `/playlists/${player.id}`;

  return (
    <Component
      showPlayerTitle={showPlayerTitle}
      playerUrl={playerUrl}
      playerTitle={player.title}
      clear={clear}
    />
  );
};
