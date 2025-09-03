import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import SettingStack from './stacks/SettingStack';
import NotificationStack from './stacks/NotificationStack';
import AudioStack from './stacks/AudioStack';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack}  />
      <Tab.Screen name="Setting" component={SettingStack} />
      <Tab.Screen name="Notification" component={NotificationStack} />
      <Tab.Screen name="Audio" component={AudioStack} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
