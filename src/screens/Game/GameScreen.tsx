import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';

const GameScreen = () => {
  return (
    <SafeAreaView edges={['top']} className="flex-1 ">
      <View className="bg-secondary  flex-1">
        {/* Logo */}
        <View className="mb-6 items-center flex flex-row justify-center " >
          <Logo color='#233066' height={responsiveScreenWidth(20)} width={responsiveScreenWidth(60)} />
          <Text>P</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GameScreen;
