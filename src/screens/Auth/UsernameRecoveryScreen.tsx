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
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import CustomHeader from '../../components/CustomHeader';

type UsernameRecoveryScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const UsernameRecoveryScreen = () => {
  const navigation = useNavigation<UsernameRecoveryScreenNavigationProp>();
  const isKeyboardVisible = useKeyboardVisible();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const handleValidate = async () => {
    if (!email.trim()) {
      toast.show('Email is required.', { type: 'danger' });
      return;
    }

    setLoading(true);
    setApiMessage(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/forgot-username`,
        { email: email.toLowerCase() }
      );

      console.log('Username Recovery Response:', response.data);

      const message =
        response.data.message ||
        'Check your email for your username details.';
      setApiMessage(message);

      toast.show(message, { type: 'success' });
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      console.log('Username Recovery Error:', err.response?.data || err.message);
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
            <Text
              className="mt-16 text-center text-textLight font-llewie"
              style={{ fontSize: responsiveFontSize(4.3) }}
            >
              Username Recovery
            </Text>

            {/* Inputs */}
            <View className="w-full pt-14 px-6 flex justify-center items-center mt-8 gap-10 z-10">
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

              {/* Recover Button */}
              <View className="w-full px-4 items-center mt-4">
                <TouchableOpacity
                  className="bg-highlight mt-6 rounded-xl w-full h-[4.8rem] items-center justify-center"
                  onPress={handleValidate}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text className="text-textLight text-[2.2rem] font-llewie text-center">
                      Recover Username
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

export default UsernameRecoveryScreen;
