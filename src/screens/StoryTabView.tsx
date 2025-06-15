import React, { useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import StoryItem from '../components/StoryItem';
import { Story } from '../types/types';
import { StoryType } from '../api/hackerNewsApi';

type Props = {
  stories: Story[];
  loading?: boolean;
  onEndReached?: () => void;
};

export default function StoryTabView({
  stories,
  onEndReached,
  loading,
}: Props) {
  const renderItem = useCallback(({ item }: { item: Story }) => {
    return <StoryItem story={item} />;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading && stories.length === 0 ? (
        <ActivityIndicator
          testID="ActivityIndicator"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          testID="FlatList"
          data={stories}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          removeClippedSubviews
          windowSize={5}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}
