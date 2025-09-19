import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameIcon from '../../assets/icons/GameIcon';
type awardScreenprops = {
answer? : string,
points?: number

}

const SolvedPuzzleScreen = ({answer , points}:awardScreenprops) => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <ImageBackground
        source={require('../../assets/images/goldensparks.png')}
        resizeMode="contain"
        className="flex-1 "
      >
        <SafeAreaView edges={['top']} className="flex-1 ">
          <View className="items-center justify-center">
            <Text className="font-llewie text-5xl text-white">Great Job!!</Text>
            <Text className="font-llewie text-2xl text-white">
              Correct answer
            </Text>
          </View>
          <View className="mt-8">
            <Text className="font-llewie text-7xl text-white text-center">
              {answer}
            </Text>
          </View>
          <View className="mt-6">
            <GameIcon width={'100%'} height={470} />
          </View>
          <View className="mt-6">
            <Text className="font-llewie text-4xl text-white text-center">
              {points} Points Awarded
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default SolvedPuzzleScreen;
