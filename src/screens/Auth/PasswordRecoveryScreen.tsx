import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import { useToast } from 'react-native-toast-notifications';
import CustomHeader from '../../components/CustomHeader';

type PasswordRecoveryScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const PasswordRecoveryScreen = () => {
  const navigation = useNavigation<PasswordRecoveryScreenNavigationProp>();
  const isKeyboardVisible = useKeyboardVisible();
  const toast = useToast();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const handleValidate = async () => {
    if (!username.trim() || !email.trim()) {
      toast.show('Username and Email are required.', { type: 'danger' });
      return;
    }

    setLoading(true);
    setApiMessage(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
        username,
        email,
      });

      console.log('Password Reset Response:', response.data);

      const message =
        response.data.message || 'Check your email for reset instructions';
      setApiMessage(message);

      toast.show(message, { type: 'success' });
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      console.log('Password Reset Error:', err.response?.data || err.message);
      toast.show(errorMsg, { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
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
            {/* <Logo width={220} height={70} /> */}
            <CustomHeader/>

            {/* Title */}
            <Text className="mt-20 text-center text-textLight text-4xl font-llewie">
              Password Reset
            </Text>

            {/* Inputs */}
            <View className="w-full pt-14 px-6 flex justify-center items-center gap-7 z-10">
              {/* Username */}
              <View className="w-full px-4 items-center gap-4">
                <Text className="text-textLight mb-1 text-4xl font-llewie">
                  Enter Username
                </Text>
                <TextInput
                  value={username}
                  onChangeText={text => setUsername(text.toLowerCase())} // ✅ enforce lowercase
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="bg-textLight w-full h-16 text-primary rounded-md text-xl font-llewie px-4"
                />
              </View>

              {/* Email */}
              <View className="w-full px-4 items-center gap-4">
                <Text className="text-textLight mb-1 text-4xl font-llewie">
                  Enter Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text.toLowerCase())} // ✅ enforce lowercase
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  className="bg-textLight w-full h-16 text-primary rounded-md text-xl font-llewie px-4"
                />
              </View>

              {/* Reset Button */}
              <View className="w-full px-4 items-center mt-2">
                <TouchableOpacity
                  className="bg-highlight mt-6 rounded-2xl w-full h-20 items-center justify-center"
                  onPress={handleValidate}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text className="text-textLight  h-12 text-[2.5rem] font-llewie text-center">
                      Reset Password
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* ✅ Show message only if API responds */}
              {apiMessage && (
                <View className="flex flex-row justify-center items-center gap-2 mt-4">
                  <Text className="text-textLight text-md font-llewie text-center">
                    {apiMessage}
                  </Text>
                </View>
              )}
            </View>

            {/* Bottom Image */}
            {!isKeyboardVisible && (
              <Image
                source={require('../../assets/images/character_img.png')}
                resizeMode="contain"
                className="w-full h-64 absolute bottom-0"
              />
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default PasswordRecoveryScreen;
