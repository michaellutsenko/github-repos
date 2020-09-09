import React from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onChange: Function;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  // Debounced version of onChange
  const onChangeDebounced = debounce<any>(onChange, 1500);

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="react"
        onChange={(e) => {
          // Default behaviour is not required
          e.preventDefault();

          // Let the parent know, the search field was updated
          onChangeDebounced(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default SearchBar;
