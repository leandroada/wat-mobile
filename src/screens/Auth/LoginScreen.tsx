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
import { useAuth } from '../../redux/AuthContext';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { login } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleLogin = async () => {
    const newErrors = {
      emailOrUsername: emailOrUsername ? '' : 'Email/Username required',
      password: password ? '' : 'Password required',
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(err => err !== '');
    if (hasError) return;

    await login(); // updates global state
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary w-full h-full"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          edges={['top']}
          className="flex-1 items-center justify-center"
        >
          <View className="w-full h-full relative items-center">
            {/* Logo */}
            <Logo width={220} height={70} />

            {/* Create Account Link */}
            <View className="flex flex-row justify-center items-center gap-2 mt-2 mb-6">
              <Text className="text-textLight text-lg font-llewie">
                Need an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="text-secondary text-lg font-llewie">
                  Create an Account
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="w-full pt-14 px-6 flex justify-center items-center gap-7 z-10">
              {/* Email/Username */}
              <View className="w-full items-center gap-4">
                <Text className="text-textLight mb-1 text-4xl font-llewie">
                  Email or Username
                </Text>
                <TextInput
                  value={emailOrUsername}
                  onChangeText={setEmailOrUsername}
                  placeholder={errors.emailOrUsername || 'Enter email or username'}
                  placeholderTextColor={errors.emailOrUsername ? 'red' : '#666'}
                  className="bg-textLight w-[75%] h-12 rounded-md text-lg font-llewie px-4"
                />
              </View>

              {/* Password */}
              <View className="w-full items-center gap-2">
                <Text className="text-textLight mb-1 text-4xl font-llewie">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder={errors.password || 'Enter password'}
                  placeholderTextColor={errors.password ? 'red' : '#666'}
                  secureTextEntry
                  className="bg-textLight w-[75%] h-12 rounded-md text-lg font-llewie px-4"
                />
              </View>

              {/* Submit */}
              <View className="w-full px-4 items-center mt-2">
                <TouchableOpacity
                  className="bg-highlight mt-6 rounded-md w-full h-16 items-center justify-center"
                  onPress={handleLogin}
                >
                  <Text className="text-textLight pt-1 h-12 text-4xl font-llewie text-center">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot */}
            <View className="flex justify-center items-center mt-12 gap-2">
              <View className="flex flex-row justify-center items-center gap-2">
                <Text className="text-textLight text-md font-llewie">
                  Forgot Username?
                </Text>
                <Text className="text-secondary text-md font-llewie">
                  Get Help
                </Text>
              </View>
              <View className="flex flex-row justify-center items-center gap-2">
                <Text className="text-textLight text-md font-llewie">
                  Forgot Password?
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

export default LoginScreen;
