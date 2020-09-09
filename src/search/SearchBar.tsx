import React from 'react';
import { debounce } from 'lodash';

import {
  Container,
  TextField,
  InputAdornment,
  LinearProgress,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

interface SearchBarProps {
  onChange: Function;
  loading?: boolean;
}

const useStyles = makeStyles({
  container: {
    marginBottom: 15,
  },
  input: {
    display: 'flex',
  },
});

const SearchBar = ({ onChange, loading }: SearchBarProps) => {
  // Debounced version of onChange
  const onChangeDebounced = debounce<any>(onChange, 1500);
  // Custom styles
  const classes = useStyles();

  return (
    <Container
      classes={{ root: classes.container }}
      aria-label="search-bar-container"
    >
      <TextField
        placeholder="react"
        onChange={(e) => {
          // Default behaviour is not required
          e.preventDefault();

          // Let the parent know, the search field was updated
          onChangeDebounced(e.target.value);
        }}
        InputProps={{
          // Search icon on the left side of the input
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        classes={{
          root: classes.input,
        }}
        aria-label="search-bar-input"
      />
      {/* Progress indicator controlled by the parent */}
      {loading && <LinearProgress aria-label="search-bar-loading-indicator" />}
    </Container>
  );
};

export default SearchBar;
