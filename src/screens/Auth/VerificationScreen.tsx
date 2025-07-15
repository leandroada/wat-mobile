import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const VerificationScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleValidate = () => {
    if (!code.trim()) {
      setError('Code is required');
      return;
    }

    setError('');
    console.log('Code submitted:', code);
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern.png')}
      resizeMode="cover"
      className="flex-1 bg-primary w-full h-full"
      imageStyle={{
        position: 'absolute',
        top: -40,
        right: -10,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          edges={['top']}
          className="flex-1 items-center justify-center"
        >
          <View className="w-full h-full relative items-center">
            <Logo width={220} height={70} />

            {/* Instruction */}
            <Text className="mt-16 text-center text-textLight text-4xl font-llewie">
              Check email for verification code
            </Text>

            {/* Input and Button */}
            <View className="w-full pt-14 px-6 flex justify-center items-center gap-7 z-10">
              <View className="w-full px-4 items-center gap-4">
                <Text className="text-textLight mb-1 text-4xl font-llewie">
                  Enter Code
                </Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder={error ? error : '123456'}
                  placeholderTextColor={error ? 'red' : '#999'}
                  className="bg-textLight w-full h-14 rounded-md text-lg font-llewie px-4"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>

              {/* Submit Button */}
              <View className="w-full px-4 items-center mt-2">
                <TouchableOpacity
                  className="bg-highlight mt-6 rounded-md w-full h-16 items-center justify-center"
                  onPress={handleValidate}
                >
                  <Text className="text-textLight pt-1 h-12 text-4xl font-llewie text-center">
                    Validate
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Help */}
              <View className="flex flex-row justify-center items-center gap-2">
                <Text className="text-textLight text-md font-llewie">
                  Didn't receive a code?
                </Text>
                <Text className="text-secondary text-md font-llewie">
                  Get Help
                </Text>
              </View>
            </View>

            {/* Bottom Image */}
            <Image
              source={require('../../assets/images/character_img.png')}
              resizeMode="contain"
              className="w-full h-64 absolute bottom-0"
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default VerificationScreen;
