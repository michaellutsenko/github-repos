import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { SearchResult } from './api/types';

import RepositoryList from './repositories/RepositoryList';
import SearchBar from './search/SearchBar';

interface SearchData {
  search: SearchResult;
}

interface SearchVars {
  after?: string;
  query: string;
}

const SEARCH = gql`
  query search($query: String!) {
    search(first: 20, query: $query, type: REPOSITORY) {
      nodes {
        ... on Repository {
          forkCount
          name
          nameWithOwner
          url
          stargazers {
            totalCount
          }
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      repositoryCount
    }
  }
`;

const defaultVars = { query: 'react' };

function App() {
  const { data, error, loading, refetch } = useQuery<SearchData, SearchVars>(
    SEARCH,
    {
      variables: defaultVars,
    }
  );

  return (
    <React.Fragment>
      <SearchBar onChange={(query: string) => refetch({ query })} />
      {data && <RepositoryList items={data.search.nodes} />}
    </React.Fragment>
  );
}

export default App;
