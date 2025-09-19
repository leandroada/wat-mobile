import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameIcon from '../../assets/icons/GameIcon';
import SpeechBubble from '../../components/SpeechBubble';
import CustomHeader from '../../components/CustomHeader';
import LogoStart from '../../components/LogoStart';
type awardScreenprops = {
  answer?: string;
};
const GameWinScreen = ({ answer }: awardScreenprops) => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-[#F4A011]"
    >
      <ImageBackground
        source={require('../../assets/images/goldensparks.png')}
        resizeMode="contain"
        className="flex-1 "
      >
        <SafeAreaView edges={['top']} className="flex-1 ">
          <View className="w-full ">
            {/* Logo */}
            <View className="mb-6 mt-10 items-center mx-24">
              <Text className="font-llewie text-6xl text-primary">
                You Win Round 1!
              </Text>
            </View>

            {/* Options */}
            <View className="w-full flex items-center relative  px-6 ">
              <View className='absolute top-28 left-10'>
                <SpeechBubble
                  message={answer || 'Nice Job'}
                  fontSize={30}
                  svgWidth={200}
                  svgHeight={150}
                  triangleOffsetX={100}
                  textTopOffset={30}
                  color={'#FFCB83'}
                  textColor={'#1C75BC'}
                />
              </View>

              {/* <View className='w-full   bg-green-500'> */}
              <View className=" flex w-full absolute top-[180px] justify-between   flex-row  ">
                <Image
                  source={require('../../assets/images/girl_charchter.png')}
                  className="w-[15rem] h-[35rem] absolute -bottom-20 -ml-10 "
                  resizeMode="contain"
                />
                <Image
                  source={require('../../assets/images/samuel_big.png')}
                  className="w-[39rem] h-[36rem]  "
                  resizeMode="contain"
                />
              </View>
              {/* </View> */}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default GameWinScreen;
