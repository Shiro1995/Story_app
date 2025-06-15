import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import StoryTabView from '../src/screens/StoryTabView';
import { Story } from '../src/types/types';

jest.mock('../src/components/StoryItem', () => {
  return ({ story }: { story: Story }) => <>{story.title}</>;
});

const mockStories: Story[] = [
  { id: 1, title: 'Story 1', by: 'user1', score: 10, kids: [] },
  { id: 2, title: 'Story 2', by: 'user2', score: 20, kids: [] },
];

describe('StoryTabView', () => {
  it('renders loading spinner when loading and no stories', () => {
    const { getByTestId } = render(
      <StoryTabView stories={[]} loading={true} type="top" />,
    );

    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('renders stories in FlatList', async () => {
    const { findByText } = render(
      <StoryTabView stories={mockStories} loading={false} type="top" />,
    );

    await waitFor(() => {
      expect(findByText('Story 1')).toBeTruthy();
      expect(findByText('Story 2')).toBeTruthy();
    });
  });

  it('calls onEndReached when end of list is reached', async () => {
    const mockFn = jest.fn();
    const { getByTestId } = render(
      <StoryTabView
        stories={mockStories}
        loading={false}
        type="top"
        onEndReached={mockFn}
      />,
    );

    const flatList = getByTestId('FlatList');

    // Trigger onEndReached manually
    fireEvent(flatList, 'onEndReached');

    expect(mockFn).toHaveBeenCalled();
  });
});
