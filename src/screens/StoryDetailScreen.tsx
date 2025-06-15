import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigation';
import { getStoryItem } from '../api/hackerNewsApi';
import { Story } from '../types/types';
import ExpandableText from '../components/ExpandableText';
import CommentItem from '../components/CommentItem';
import { computeDepth } from '../utils/helper';

const StoryDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryDetail'>>();
  const story = route.params?.story;

  const [comments, setComments] = useState<Story[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (story?.kids?.length) {
        setLoadingComments(true);
        const commentIds = story.kids.slice(0, 10);
        const commentData = await Promise.all(commentIds.map(getStoryItem));
         const filtered = commentData.filter(c => c && c.text);
        const depthComment = computeDepth(filtered, story.id)
        setComments(depthComment);

        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [story]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{story?.title}</Text>
        <Text style={styles.meta}>By {story?.by}</Text>
        <Text style={styles.meta}>Score: {story?.score}</Text>

        {story?.text && (
          <View style={{ marginTop: 16 }}>
            <ExpandableText text={story.text.replace(/<[^>]+>/g, '')} />
          </View>
        )}
      </View>

      <View style={styles.commentSection}>
        <Text style={styles.commentHeader}>Comments</Text>

        {loadingComments ? (
          <ActivityIndicator style={{ marginTop: 10 }} />
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              depth={comment.parent === story?.id ? 0 : 1}
            />
          ))
        ) : (
          <Text style={styles.noComment}>No comments yet.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default StoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  commentSection: {
    marginTop: 24,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  commentCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#007aff',
    fontSize: 16,
  },
  noComment: {
    fontStyle: 'italic',
    color: '#999',
    marginTop: 12,
  },
});
