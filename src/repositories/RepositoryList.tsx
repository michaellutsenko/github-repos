// RepositoryList only functions as a view for search results

import React from 'react';
import { RepositoryInfo } from '../api/types';

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Link,
} from '@material-ui/core';
import { Star, Restaurant } from '@material-ui/icons';

interface RepositoryListProps {
  items: [RepositoryInfo];
}

const RepositoryList = ({ items }: RepositoryListProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">
            <Star />
            &nbsp;Stars
          </TableCell>
          <TableCell align="right">
            <Restaurant />
            &nbsp;Forks
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((repo: RepositoryInfo, index: number) => (
          <TableRow key={`repo_row_${index}`}>
            <TableCell>
              <Link href={repo.url}>{repo.nameWithOwner}</Link>
            </TableCell>
            <TableCell align="right">{repo.stargazers.totalCount}</TableCell>
            <TableCell align="right">{repo.forkCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default RepositoryList;
