import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  concat,
} from '@apollo/client';

const clients: Record<string, ApolloClient<any>> = {};

export const createApolloClient = (options: {
  uri: string;
  headers?: Record<string, string>;
  cache?: ApolloCache<NormalizedCacheObject>;
}) => {
  let client: ApolloClient<any> | null = clients[options.uri];

  if (client) {
    return client;
  }

  options.headers = options.headers ?? {};
  options.cache = options.cache ?? new InMemoryCache();

  const http = new HttpLink({
    uri: options.uri,
  });

  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: { ...headers, ...options.headers },
    }));

    return forward(operation);
  });

  client = clients[options.uri] = new ApolloClient({
    ssrMode: false, // Not using SSR
    link: concat(middleware, http),
    cache: options.cache,
  });

  return client;
};

export const chOneService = () => {
  //console.log(process.env.SITECORE_CH1_ENDPOINT_URL);

  return createApolloClient({
    uri: process.env.SITECORE_CH1_ENDPOINT_URL ?? 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'X-GQL-Token': process.env.SITECORE_CH1_CLIENT_KEY ?? '',
    },
  });
};
