import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from './Logo';
import Svg, { SvgProps, Path } from "react-native-svg"
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SvgComponent = ({ width = 22, height = 41, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 32"
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M15.68.93.713 15.896 15.68 30.864l5.613-5.613-9.355-9.354 9.355-9.355L15.68.929Z"
    />
  </Svg>
);


const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between  w-full" style={{height: responsiveHeight(8.5)}}>
      {/* Back Button */}
      <TouchableOpacity className='bg-highlight h-full flex justify-center items-center w-[5.5rem] rounded-r-[1.8rem]' onPress={() => navigation.goBack()}>
        <SvgComponent width={responsiveWidth(8)} height={responsiveHeight(8)}/>
      </TouchableOpacity>

      {/* Logo in center */}
              <Logo
                width={responsiveWidth(55)}
                height={responsiveHeight(8)}
              />

      {/* Spacer to balance layout */}
      <View className="w-[60px]" />
    </View>
  );
};

export default CustomHeader;
