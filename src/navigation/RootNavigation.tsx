import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StoryDetailScreen from '../screens/StoryDetailScreen';
import { ScreenNames } from './NavigationUtils';
import { Story } from '../types/types';

export type RootStackParamList = {
  [ScreenNames.Home]: undefined;
  [ScreenNames.StoryDetail] : { story: Story };
};

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.Home}>
        <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
        <Stack.Screen name={ScreenNames.StoryDetail} component={StoryDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
