import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import HomeIcon from '../assets/icons/Home';
import SettingIcon from '../assets/icons/SettingIcon';
import InfoIcon from '../assets/icons/InfoIcon';
import AudioIcon from '../assets/icons/AudioIcon';

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <View
      style={{ flexDirection: 'row', backgroundColor: '#1C75BC', height: 95 }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          navigation.navigate(route.name);
        };

        // Select icon based on route name
        let IconComponent;
        switch (route.name) {
          case 'Home':
            IconComponent = HomeIcon;
            break;
          case 'Setting':
            IconComponent = SettingIcon;
            break;
          case 'Info':
            IconComponent = InfoIcon;
            break;
          case 'Audio':
            IconComponent = AudioIcon;
            break;
          default:
            IconComponent = HomeIcon;
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: index !== state.routes.length - 1 ? 1 : 0,
              borderRightColor: 'black',
            }}
          >
            <IconComponent
              width={40}
              height={40}
              color={isFocused ? '#FFB949' : 'white'}
            />
            <Text
              style={{
                color: isFocused ? '#FFB949' : 'white',
                fontSize: 12,
                marginTop: 4,
                fontFamily: 'Llewie',
              }}
            >
              {typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
