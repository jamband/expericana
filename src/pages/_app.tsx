import type { AppProps } from "next/app";
import Head from "next/head";
import { Hydrate } from "react-query/hydration";
import { Player } from "~/components/player";
import { PlayerProvider } from "~/contexts/player";
import { QueryClientProvider } from "~/contexts/query-client";
import { Layout } from "~/layouts/layout";
import { Loading } from "~/layouts/loading";
import "~/styles/app.scss";
import { RegisterFontAwesomeIcons } from "~/utils/fontawesome";

export default function MyApp({ Component, pageProps }: AppProps) {
  RegisterFontAwesomeIcons();

  return (
    <QueryClientProvider dehydratedState={pageProps.dehydratedState}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        <PlayerProvider>
          <Layout>
            <Loading />
            <Player />
            <Component {...pageProps} />
          </Layout>
        </PlayerProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
