import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameIcon from '../../assets/icons/GameIcon';
import SpeechBubble from '../../components/SpeechBubble';
import CustomHeader from '../../components/CustomHeader';
import LogoStart from '../../components/LogoStart';
type awardScreenprops = {
answer? : string,

}
const GameInstructionScreen = ({answer}:awardScreenprops) => {
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
            <LogoStart />
          </View>

          {/* Options */}
          <View className="w-full flex items-center relative  px-6 ">
            <SpeechBubble
              message={answer ||'Nice Work! \n\nLets move \non to step 2...'}
              fontSize={30}
              svgWidth={300}
              svgHeight={250}
              triangleOffsetX={230}
              textTopOffset={30}
            />

            {/* <View className='w-full   bg-green-500'> */}
            <View className=" flex w-full absolute top-[180px] justify-between   flex-row  ">
              <Image
                source={require('../../assets/images/samuel_big.png')}
                className="w-[39rem] h-[40rem] -ml-44 "
                resizeMode="contain"
              />
            </View>
            {/* </View> */}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GameInstructionScreen;
