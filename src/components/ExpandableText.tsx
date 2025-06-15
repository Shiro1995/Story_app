import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  text: string;
  numberOfLines?: number;
};

export default function ExpandableText({ text, numberOfLines = 3 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded(p => !p);

  const cleaned = text
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <View style={{ width: '100%' }}>
      <Text
        numberOfLines={expanded ? undefined : numberOfLines}
        ellipsizeMode="tail"
        style={{ width: '100%', fontSize: 13, lineHeight: 22 }}
      >
        {cleaned}
      </Text>

      {cleaned.length > 100 && (
        <TouchableOpacity onPress={toggle}>
          <Text style={{ color: 'gray', marginTop: 4, fontWeight: 500 }}>
            {expanded ? 'See less' : 'See more'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
