import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions, StackActions } from '@react-navigation/native';
import HomeIcon from '../assets/icons/Home';
import SettingIcon from '../assets/icons/SettingIcon';
import NotificationIcon from '../assets/icons/NotificationIcon';
import AudioIcon from '../assets/icons/AudioIcon';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View
      className="flex-row bg-highlight"
      style={{ height: responsiveHeight(11.5) }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          // Always navigate first
          navigation.navigate(route.name);

          const subState = state.routes[index].state as
            | { key: string; type: string }
            | undefined;

          // Then reset the stack immediately
          if (subState?.type === 'stack') {
            navigation.dispatch({
              ...StackActions.popToTop(),
              target: subState.key,
            });
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: route.name }],
              }),
            );
          }
        };

        let IconComponent;
        switch (route.name) {
          case 'Home':
            IconComponent = HomeIcon;
            break;
          case 'Setting':
            IconComponent = SettingIcon;
            break;
          case 'Notification':
            IconComponent = NotificationIcon;
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
              width={responsiveFontSize(4.7)}
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
