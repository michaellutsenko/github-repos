import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { SearchResult, RepositoryInfo } from '../api/types';

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

const RepoList = () => {
  const { data, error, loading } = useQuery<SearchData, SearchVars>(SEARCH, {
    variables: { query: 'react' },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return data ? (
    <React.Fragment>
      {data.search.nodes.map((repo: RepositoryInfo) => (
        <div>
          {repo.name}, {repo.url}, {repo.stargazers.totalCount},{' '}
          {repo.forkCount}
        </div>
      ))}
    </React.Fragment>
  ) : null;
};

export default RepoList;
