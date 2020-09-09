import React from 'react';
import { debounce } from 'lodash';

interface SearchBarProps {
  onChange: Function;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  const onChangeDebounced = debounce<any>(onChange, 1500);

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="react"
        onChange={(e) => {
          e.preventDefault();
          onChangeDebounced(e.target.value);
        }}
      />
    </React.Fragment>
  );
};

export default SearchBar;
