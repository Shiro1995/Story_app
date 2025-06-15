import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { getStoryIds, getStoryItem, StoryType } from '../api/hackerNewsApi';
import StoryTabView from './StoryTabView';
import { Story } from '../types/types';
import { WINDOW_SIZE } from '../utils/helper';

const PAGE_SIZE = 10;
const initialLayout = { width: WINDOW_SIZE.width };

const tabKeys: StoryType[] = ['new', 'top', 'best'];

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<StoryType>(tabKeys[0]);
  const [ids, setIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const routes = tabKeys.map(k => ({ key: k, title: k.toUpperCase() }));

  useEffect(() => {
    setSelectedType(tabKeys[index]);
  }, [index]);

  useEffect(() => {
    setPage(0);
    setStories([]);
    fetchStoryIds();
  }, [selectedType]);

  const fetchStoryIds = async () => {
    setLoading(true);
    const data = await getStoryIds(selectedType);
    setIds(data);
    setLoading(false);
  };

  const loadMore = async () => {
    if (!ids.length || loading) return;

    setLoading(true);

    const start = page * PAGE_SIZE;
    const nextIds = ids.slice(start, start + PAGE_SIZE);
    const newStories = await Promise.all(nextIds.map(id => getStoryItem(id)));
    setStories(prev => [...prev, ...newStories]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (ids.length > 0) {
      loadMore();
    }
  }, [ids]);

  const renderScene = useCallback(
    ({ route }: { route: { key: StoryType } }) => {
      const isActive = route.key === selectedType;

      return (
        <StoryTabView
          stories={isActive ? stories : []}
          onEndReached={isActive ? loadMore : undefined}
          loading={loading}
        />
      );
    },
    [selectedType, stories, loading, loadMore],
  );

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => {
          setStories([]);
          setIndex(index);
        }}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor="#2E7D32"
            inactiveColor="gray"
            indicatorStyle={{
              backgroundColor: '#2E7D32',
              height: 3,
            }}
            indicatorContainerStyle={{ backgroundColor: 'white' }}
          />
        )}
      />
    </View>
  );
}
