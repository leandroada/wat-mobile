import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoStart from '../../components/LogoStart';
import { RootStackParamList } from '../../types/navigation';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const StartScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const HandleLogin = () => {
    console.log('Form submitted');
    navigation.navigate('Login');
  };
  const HandleSignUp = () => {
    console.log('Form submitted');
    navigation.navigate('Register');
  };
  return (
    <ImageBackground
      source={require('../../assets/images/bg_startScreen.png')}
      resizeMode="contain"
      className="flex-1 bg-primary w-full h-full"
 
    >
      <SafeAreaView
        edges={['top']}
        className=" flex-1 items-center justify-center "
      >
        <View className=" w-full h-full  relative justify-center items-center">
          <View className=" flex justify-center items-center mb-16">
            <LogoStart width={350} height={100} />
            <Text className="text-textLight text-3xl font-llewie ">
              Get to know scripture,
            </Text>
            <Text className="text-textLight text-3xl font-llewie ">
              one puzzle at a time.
            </Text>
          </View>

          <View className="w-full mb-40 flex justify-center items-center">
            <View className="w-full px-4 items-center ">
              <TouchableOpacity
                className="bg-highlight   rounded-lg w-[70%] h-14  items-center justify-center"
                onPress={() => HandleLogin()}
              >
                <Text className="text-textLight  text-2xl font-llewie text-center">
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full px-4 items-center">
              <TouchableOpacity
                className="bg-highlight mt-6  rounded-lg w-[70%] h-14  items-center justify-center"
                onPress={() => HandleSignUp()}
              >
                <Text className="text-textLight  text-2xl font-llewie text-center">
                  SIGNUP
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* character image */}
          <Image
            source={require('../../assets/images/character_img.png')}
            resizeMode="contain"
            className="w-full h-64 absolute bottom-0"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartScreen;
