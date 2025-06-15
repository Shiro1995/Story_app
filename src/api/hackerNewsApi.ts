import axios from 'axios';
import { Story } from '../types/types';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export type StoryType = 'new' | 'top' | 'best';

export const getStoryIds = async (type: StoryType): Promise<number[]> => {
  const response = await axios.get<number[]>(`${BASE_URL}/${type}stories.json`);
  return response.data;
};

export const getStoryItem = async (id: number): Promise<Story> => {
  const response = await axios.get<Story>(`${BASE_URL}/item/${id}.json`);
  return response.data;
};