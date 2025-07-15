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
import SpeechBubble from '../../components/SpeechBubble';

const GameIntroScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1 ">
        <View className="w-full ">
          {/* Logo */}
          <View className="mb-6 items-center">
            <CustomHeader />
          </View>

          {/* Options */}
          <View className="w-full flex items-center relative  px-6 ">
            <SpeechBubble
              message={'Welcome to With A Twist! \n\nInstruction'}
              fontSize={30}
              svgWidth={360}
              svgHeight={500}
              triangleOffsetX={140}
              textTopOffset={50}
            />

            {/* <View className='w-full   bg-green-500'> */}
            <View className=" flex w-full absolute top-[400px] justify-between  h-96 flex-row  ">
              <Image
                source={require('../../assets/images/samuel_big.png')}
                className="w-80 h-80 -ml-20 "
                resizeMode="contain"
              />
              <TouchableOpacity className='bg-highlight mt-48 h-16 w-48 -mr-10 flex justify-center rounded-l-full '>
                <Text className="text-white text-4xl font-llewie text-start pl-8">
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GameIntroScreen;
