import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Player } from "~/components/player";
import { PlayerProvider } from "~/contexts/player";
import { Layout } from "~/layouts/layout";
import { Loading } from "~/layouts/loading";
import { RegisterFontAwesomeIcons } from "~/utils/fontawesome";
import "~/styles/app.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  RegisterFontAwesomeIcons();

  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  useEffect(() => {
    import("lazysizes");
    require("lazysizes/plugins/aspectratio/ls.aspectratio");
  }, []);

  return (
    <QueryClientProvider client={queryClientRef.current}>
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
