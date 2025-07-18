import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/icons/Home';
import SettingIcon from '../assets/icons/SettingIcon';
import InfoIcon from '../assets/icons/InfoIcon';
import AudioIcon from '../assets/icons/AudioIcon';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      className="flex-row bg-highlight"
      style={{ height: responsiveHeight(11.5) }} // around 95 on large screens
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          navigation.navigate(route.name);
        };

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
            className="flex-1 items-center justify-center"
            style={{
              borderRightWidth: index !== state.routes.length - 1 ? 1 : 0,
              borderRightColor: 'black',
              paddingVertical: responsiveHeight(1),
            }}
          >
            <IconComponent
              width={responsiveFontSize(4.7)} // adjusts on smaller screens
              height={responsiveFontSize(4.7)}
              color={isFocused ? '#FFB949' : 'white'}
            />
            <Text
              className="font-llewie mt-1"
              style={{
                color: isFocused ? '#FFB949' : 'white',
                fontSize: responsiveFontSize(1.3),
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
