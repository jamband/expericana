import { Provider } from "./provider";

export type Player = {
  id: string;
  title: string;
  provider: "" | Provider;
  provider_key: string;
  type: "" | "track" | "playlist";
  loading: boolean;
};
