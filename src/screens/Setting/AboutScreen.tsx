import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import CircleImage from '../../components/CircleImage';
import CustomHeader from '../../components/CustomHeader';

const AboutScreen = () => {
return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="w-full ">
          {/* Logo */}
          <View className="mb-6 items-center">
            <CustomHeader />
          </View>
      
          {/* Options */}
          <View className="w-full h-full px-6 py-8 p-10 bg-textLight">
            <Text className="font-llewie h-auto mt-2 text-primary text-[4rem]">
              About
            </Text>
            <View className="flex gap-2 px-2 mt-9">
              <View >
                <Text className="font-llewie text-primary text-4xl">
                  Version Number
                </Text>
              </View>
              <View >
                <Text className="font-llewie text-primary text-4xl">
                  Terms of Service
                </Text>
              </View>
              <View >
                <Text className="font-llewie text-primary text-4xl">
                  Privacy Policy
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default AboutScreen