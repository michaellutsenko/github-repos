import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { SearchResult, RepositoryInfo } from './api/types';

import RepositoryList from './repositories/RepositoryList';
// import SearchBar from './search/SearchBar';

interface SearchData {
  search: SearchResult;
}

interface SearchVars {
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

function App() {
  const { data, error, loading } = useQuery<SearchData, SearchVars>(SEARCH, {
    variables: { query: 'react' },
  });

  return (
    <React.Fragment>
      {/* <SearchBar onChange={() => null} /> */}
      {data && <RepositoryList items={data.search.nodes} />}
    </React.Fragment>
  );
}

export default App;
