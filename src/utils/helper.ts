import { Dimensions } from "react-native";

export const WINDOW_SIZE = Dimensions.get('window')

import { Story } from '../types/types';


export function computeDepth(comments: Story[], rootParentId: number): Story[] {
  const idToComment = new Map<number, Story>();
  const result: Story[] = [];

  comments.forEach(c => idToComment.set(c.id, c));

  for (const comment of comments) {
    let depth = 0;
    let currentParentId = comment.parent;

    while (currentParentId && currentParentId !== rootParentId) {
      const parentComment = idToComment.get(currentParentId);
      if (!parentComment) break;
      depth += 1;
      currentParentId = parentComment.parent;
    }

    result.push(comment);
  }

  return result;
}
