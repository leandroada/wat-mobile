import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorialScreen from '../../screens/info/TutorialScreen';
const Stack = createNativeStackNavigator();

const InfoStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TutorialScreen" component={TutorialScreen}  />
      {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
    </Stack.Navigator>
  )
}

export default InfoStack