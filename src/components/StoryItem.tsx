import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigation';
import { ScreenNames } from '../navigation/NavigationUtils';
import { Story } from '../types/types';

type Props = {
  story: Story;
};

const StoryItem = ({ story }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onNavigate = () => {
    navigation.navigate(ScreenNames.StoryDetail, {
      story: story,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onNavigate}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.meta}>
        by {story.by} • {story.score} points
      </Text>
      {story.text && (
        <Text style={styles.text} numberOfLines={2}>
          {story.text.replace(/<[^>]+>/g, '')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  text: {
    marginTop: 4,
  },
});

export default React.memo(
  StoryItem,
  (prev, next) => prev.story.id === next.story.id,
);
