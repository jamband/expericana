import type { Player } from "~/types/player";

export type _Props = {
  display: "" | "none";
  is1x1Ratio: boolean;
  player: Player;
  src: string;
  setLoading: (loading: boolean) => void;
  backTo: "/tracks" | "/playlists";
  backToText: "Tracks" | "Playlists";
};
