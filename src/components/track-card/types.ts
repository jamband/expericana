import type { Provider } from "~/types/provider";

export type Props = {
  id: string;
  provider: Provider;
  image: string;
  title: string;
  footer: string;
  children: React.ReactNode;
};

export type _Props = Props & {
  ratioSelector: string;
  ratio: string;
  audioStatusIcon: "pause-circle" | "play-circle";
};
