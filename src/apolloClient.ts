// Apollo Client configuration

import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.REACT_APP_API_URI;
const token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN;

/**
 * Create and configure Apollo Client.
 * The configuration includes an OAuth header for every request.
 * @see https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
 * @returns {ApolloClient} A newly created instance of Apollo Client.
 */
export const createAndConfigureClient = () => {
  const client = new ApolloClient({
    uri,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    cache: new InMemoryCache(),
  });

  return client;
};
