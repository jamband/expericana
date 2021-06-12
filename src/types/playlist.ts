import type { Provider } from "./provider";

export type Playlist = {
  id: string;
  url: string;
  provider: Provider;
  provider_key: string;
  title: string;
};
