import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider as Provider,
  QueryOptions,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${queryKey![0]}`).then(
    (response) => {
      return response.json();
    }
  );
};

type Props = {
  children: React.ReactNode;
  dehydratedState: unknown;
};

export const QueryClientProvider: React.VFC<Props> = (props) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: defaultQueryFn,
          },
        },
      })
  );

  return (
    <Provider client={client}>
      <Hydrate state={props.dehydratedState}>{props.children}</Hydrate>
      <ReactQueryDevtools />
    </Provider>
  );
};
