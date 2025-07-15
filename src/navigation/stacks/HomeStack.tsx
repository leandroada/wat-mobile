import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import GameSelectionScreen from '../../screens/Game/GameSelectionScreen';
import CharacterScreen from '../../screens/Game/CharacterScreen';
import GameIntroScreen from '../../screens/Game/GameIntroScreen';
import MyFriendsScreen from '../../screens/Home/MyFriendsScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}  />
      <Stack.Screen name="MyFriends" component={MyFriendsScreen}  />
      <Stack.Screen name="GameSelection"  component={GameSelectionScreen} />
      <Stack.Screen name="CharacterScreen" component={CharacterScreen} />
      <Stack.Screen name="GameIntroScreen"    options={{
      animation: 'fade', // ✅ Apply fade-in only to this screen
      presentation: 'card', // or 'modal' if you prefer
      headerShown: false,
    }} component={GameIntroScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack