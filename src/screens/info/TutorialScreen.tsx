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
import Logo from '../../components/Logo';
import CircleImage from '../../components/CircleImage';
import CustomHeader from '../../components/CustomHeader';

const TutorialScreen = () => {
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
          {/* instruction title*/}
          <View className='flex justify-center items-center mb-6'>
            
            <Text className="text-white text-4xl font-llewie">Full Game Instruction</Text>
          </View>
          
            {/* instruction */}
        <View className="mx-9 rounded-t-3xl h-full items-center justify-center bg-textLight"></View>

          <View></View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default TutorialScreen