import qs from "querystring";

type Http = {
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  headers?: HeadersInit | undefined;
  url: string;
  params?: qs.ParsedUrlQueryInput | undefined;
  data?: unknown;
};

export const http = ({ method, headers, url, params, data }: Http) => {
  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method) {
    options.method = method;
  }

  if (headers) {
    options.headers = { ...options.headers, ...headers };
  }

  let input = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  if (params) {
    const paramsPrefix = url.indexOf("?") !== -1 ? "&" : "?";
    input += `${paramsPrefix}${qs.stringify(params)}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(input, options);
};
