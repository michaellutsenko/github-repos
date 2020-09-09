// Basic tests for business logic

import React from 'react';
import App, { SEARCH } from './App';
import SearchBar from './search/SearchBar';
import { MockedProvider } from '@apollo/client/testing';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';

// Mocks for MockedProvider
const mocks = [
  {
    request: {
      query: SEARCH,
      variables: {
        query: 'react',
      },
    },
    result: {
      data: {
        search: {
          nodes: [
            {
              __typename: 'Repository',
              forkCount: 1,
              name: 'react',
              nameWithOwner: 'facebook/react',
              url: 'http://127.0.0.1',
              stargazers: {
                totalCount: 100,
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'aaaaaa',
          },
        },
      },
    },
  },
  {
    request: {
      query: SEARCH,
      variables: {
        query: 'test',
      },
    },
    result: {
      data: {
        search: {
          nodes: [
            {
              __typename: 'Repository',
              forkCount: 1,
              name: 'react',
              nameWithOwner: 'TEST',
              url: 'http://127.0.0.1',
              stargazers: {
                totalCount: 100,
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'aaaaaa',
          },
        },
      },
    },
  },
];

describe('app', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  test.skip('renders without errors', async () => {
    const result = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitForElement(() => result.getByTestId('repository-list'));

    // Expect the app to render something after the execution of the main query
    expect(result).not.toBeNull();
  });

  test.skip('renders all UI elements correctly', async () => {
    const result = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // App renders the search bar loading indicator
    await waitForElement(() =>
      result.getByTestId('search-bar-loading-indicator')
    );

    // Wait for the query execution
    await waitForElement(() => result.getByTestId('repository-list'));

    // App renders the "load more" button
    expect(result.getByTestId('load-more-button')).toBeDefined();
  });

  test.skip('renders the query results correctly', async () => {
    const result = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await waitForElement(() => result.getByTestId('repository-list'));

    // getByTestId throws at any number of fitting nodes except for 1
    expect(result.getByTestId('repository-list-row')).toBeDefined();
    expect(result.getAllByTestId('repository-list-row').length).toEqual(1);
  });

  test('SearchBar calls the callback correctly after an interval', async () => {
    const mockCallback = jest.fn();

    const searchBar = render(<SearchBar onChange={mockCallback} />);
    const input = await searchBar.findByTestId('search-bar-input');

    fireEvent.change(input, { target: { value: 'test' } });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mockCallback.mock.calls.length).toEqual(0);

    fireEvent.change(input, { target: { value: 'test2' } });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mockCallback.mock.calls.length).toEqual(0);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(mockCallback.mock.calls.length).toEqual(1);
    expect(mockCallback.mock.calls[0][0]).toEqual('test2');
  });
});
