import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { RootStackParamList } from '../../types/navigation';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
  

const SupportScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <View className="flex-1 bg-primary -z-10">
      {/* Top 20% Background Dots */}
      <View
        style={{
          position: 'absolute',
          top: 10,
          width: '100%',
          height: responsiveHeight(20),
          zIndex: -1,
        }}
      >
        <Image
          source={require('../../assets/images/bg-pattern-large.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: 1.2 }],
          }}
        />
      </View>
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="w-full ">
          {/* Logo */}
          <View className="mb-6 items-center">
            <CustomHeader />
          </View>

          {/* Options */}
          <View className="w-full h-full px-6 py-8 p-10 bg-textLight">
            <Text
              className="font-llewie text-primary "
              style={{ fontSize: responsiveFontSize(5.5) }}
            >
              Support
            </Text>
            <View className="flex gap-1 px-2 mt-9">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("playtutorial")
                }
              >
                <Text
                  className="font-llewie text-primary "
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
                  How to Play & Tutorial
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  className="font-llewie text-primary "
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
                  Help Center FAQ
                </Text>
              </View>
              <View>
                <Text
                  className="font-llewie text-primary "
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
                  Contact Support
                </Text>
              </View>
              <View>
                <Text
                  className="font-llewie text-primary "
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
                  Report a Problem
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SupportScreen;
