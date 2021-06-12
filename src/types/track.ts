import type { Provider } from "./provider";

export type Track = {
  id: string;
  url: string;
  provider: Provider;
  provider_key: string;
  title: string;
  image: string;
  created_at: string;
  genres: [{ name: string }];
};
