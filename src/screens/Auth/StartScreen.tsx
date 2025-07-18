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
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const StartScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
const isKeyboardVisible = useKeyboardVisible();

  const HandleLogin = () => {
    navigation.navigate('Login');
  };
  const HandleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_startScreen.png')}
      resizeMode="contain"
      className="flex-1 bg-primary"
    >
      <SafeAreaView
        edges={['top']}
        className="flex-1 items-center justify-center"
      >
        <View className="w-full h-full relative justify-center items-center">
          {/* Logo + Slogan */}
          <View className="items-center " style={{marginBottom:responsiveHeight(6)}}>
            <LogoStart width={responsiveWidth(80)} height={responsiveHeight(10)} />
            <Text
              className="text-textLight font-llewie text-center"
              style={{ fontSize: responsiveFontSize(2.8), marginTop: responsiveHeight(0) }}
            >
              Get to know scripture,
            </Text>
            <Text
              className="text-textLight font-llewie text-center"
              style={{ fontSize: responsiveFontSize(2.8) }}
            >
              one puzzle at a time.
            </Text>
          </View>

          {/* Buttons */}
          <View
            className="w-full items-center"
            style={{ marginBottom: responsiveHeight(12) }}
          >
            <TouchableOpacity
              className="bg-highlight rounded-lg items-center justify-center"
              style={{
                width: responsiveWidth(70),
                height: responsiveHeight(6.5),
              }}
              onPress={HandleLogin}
            >
              <Text
                className="text-textLight font-llewie text-center"
                style={{ fontSize: responsiveFontSize(2.4) }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-highlight rounded-lg items-center justify-center mt-4"
              style={{
                width: responsiveWidth(70),
                height: responsiveHeight(6.5),
              }}
              onPress={HandleSignUp}
            >
              <Text
                className="text-textLight font-llewie text-center"
                style={{ fontSize: responsiveFontSize(2.4) }}
              >
                SIGNUP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom character image */}
          {!isKeyboardVisible &&           <Image
            source={require('../../assets/images/character_img.png')}
            resizeMode="contain"
            className="absolute bottom-0"
            style={{ width: '100%', height: responsiveWidth(55) }}
          />}

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartScreen;
