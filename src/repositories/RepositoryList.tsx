// RepositoryList only functions as a view for search results

import React from 'react';
import { RepositoryInfo } from '../api/types';

interface RepositoryListProps {
  items: [RepositoryInfo];
}

const RepositoryList = ({ items }: RepositoryListProps) => (
  <React.Fragment>
    {items.map((repo: RepositoryInfo) => (
      <div>
        {repo.name}, {repo.url}, {repo.stargazers.totalCount}, {repo.forkCount}
      </div>
    ))}
  </React.Fragment>
);

export default RepositoryList;
