import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { SearchResult } from './api/types';

import { Container, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
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
  query search($query: String!, $after: String) {
    search(after: $after, first: 20, query: $query, type: REPOSITORY) {
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
        endCursor
        hasNextPage
      }
    }
  }
`;

const useStyles = makeStyles({
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px 0',
  },
});

function App() {
  // Search item that is requested from the API
  const [query, setQuery] = useState('react');

  // Main search query
  const { data, error, loading, fetchMore } = useQuery<SearchData, SearchVars>(
    SEARCH,
    {
      variables: { query },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Custom styles
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <SearchBar
        onChange={(query?: string) => {
          // Only perform refetch when the query is not empty
          if (query) {
            // Updating the state variable will cause the query to refetch itself
            setQuery(query);
          }
        }}
        loading={loading}
      />

      {/* If data exists, show the repository list */}
      {data && (
        <Container>
          <RepositoryList items={data.search.nodes} />
        </Container>
      )}

      {error && (
        <Alert severity="error">
          <AlertTitle>GraphQL Error</AlertTitle>
          {error}
        </Alert>
      )}

      {/* If next page exists, show "Load more" button */}
      {data && data.search.pageInfo.hasNextPage && (
        <Container classes={{ root: classes.loadMoreContainer }}>
          <Button
            color="primary"
            onClick={() =>
              fetchMore({
                // Same query as before, with added end cursor
                query: SEARCH,
                variables: { query, after: data.search.pageInfo.endCursor },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;

                  const newNodes = [
                    ...prev.search.nodes,
                    ...fetchMoreResult.search.nodes,
                  ];

                  return {
                    search: {
                      nodes: newNodes,
                      pageInfo: fetchMoreResult.search.pageInfo,
                    },
                  } as SearchData;
                },
              })
            }
          >
            Load more
          </Button>
        </Container>
      )}
    </Container>
  );
}

export default App;
