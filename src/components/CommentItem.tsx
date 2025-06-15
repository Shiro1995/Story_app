import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ExpandableText from './ExpandableText';
import { Story } from '../types/types';

type Props = {
  comment: Story;
  depth?: number;
};

const CommentItem = ({ comment, depth = 0 }: Props) => {
  const indent = depth * 12;

  return (
    <View style={[styles.container, { marginLeft: indent }]}>
      <Text style={styles.author}>{comment.by}:</Text>
      {comment.text && (
        <ExpandableText text={comment.text.replace(/<[^>]+>/g, '')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default React.memo(CommentItem, (prevProps, nextProps) => {
  return (
    prevProps.comment.id === nextProps.comment.id &&
    prevProps.comment.text === nextProps.comment.text
  );
});
