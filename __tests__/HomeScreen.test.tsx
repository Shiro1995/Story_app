import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import * as api from '../src/api/hackerNewsApi';

jest.mock('../src/api/hackerNewsApi');

const mockStories = [
  { id: 1, title: 'Story 1', by: 'user1', kids: [10], score: 100 },
  { id: 2, title: 'Story 2', by: 'user2', kids: [11], score: 90 },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    (api.getStoryIds as jest.Mock).mockResolvedValue([1, 2]);
    (api.getStoryItem as jest.Mock).mockImplementation((id: number) =>
      Promise.resolve(
        mockStories.find(story => story.id === id) ?? {
          id,
          title: `Story ${id}`,
          by: 'mockUser',
          score: 0,
        },
      ),
    );
  });
  it('renders stories after fetching', async () => {
    const { findByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(findByText('Story 1')).toBeTruthy();
      expect(findByText('Story 2')).toBeTruthy();
    });
  });

  it('switches tabs correctly', async () => {
    const { findByText, getAllByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(findByText('Story 1')).toBeTruthy();
    });
    const topButtons = getAllByText('TOP');
    fireEvent.press(topButtons[0]);

    expect(api.getStoryIds).toHaveBeenCalledWith('top');
  });
});
