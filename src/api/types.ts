// Types for GitHub GraphQL API
// See: https://developer.github.com/v4/
// The types below only include fields relevant for the purpose of this app

/**
 * Search query result.
 * Matches SearchResultItemConnection in GitHub API reference.
 * @see https://docs.github.com/en/graphql/reference/objects#searchresultitemconnection
 */
export type SearchResult = {
  nodes: [];
  pageInfo: null;
  repositoryCount: number;
};

/**
 * Repository info.
 * Only includes relevant fields.
 * @see https://docs.github.com/en/graphql/reference/objects#repository
 */
export type RepositoryInfo = {
  forkCount: number;
  name: string;
  nameWithOwner: string;
  url: string;
  stargazers: {
    totalCount: number;
  };
};

/**
 * Information for pagination.
 * @see https://docs.github.com/en/graphql/reference/objects#pageinfo
 */
export type PageInfo = {
  startCursor?: string;
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
