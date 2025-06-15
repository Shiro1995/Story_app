import 'react-native-gesture-handler'

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import StoryDetailScreen from './src/screens/StoryDetailScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParamList = {
  Home: undefined;
  StoryDetail: { postId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
     <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hacker News' }} />
        <Stack.Screen name="StoryDetail" component={StoryDetailScreen} options={{ title: 'Post Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
