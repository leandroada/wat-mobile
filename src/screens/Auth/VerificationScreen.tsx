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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import { useToast } from 'react-native-toast-notifications';

type VerificationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Verification'
>;

type VerificationRouteProp = RouteProp<RootStackParamList, 'Verification'>;

const VerificationScreen = () => {
  const navigation = useNavigation<VerificationScreenNavigationProp>();
  const route = useRoute<VerificationRouteProp>();
  const isKeyboardVisible = useKeyboardVisible();
  const toast = useToast();

  const { email } = route.params; // ✅ Email passed from Register screen

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleResend = async () => {
    if (resend) return; // prevent double clicks
    setResend(true);
    setTimer(9); // disable for 10 seconds

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, {
        email: email,
      });
      toast.show(response.data.message || 'OTP resent successfully!', {
        type: 'success',
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.error?.message || 'Failed to resend OTP.';
      console.log('Resend OTP Error:', err.response?.data || err.message);
      toast.show(errorMsg, { type: 'danger' });
    }
  };

  // countdown effect
  useEffect(() => {
    let interval: any;
    if (resend && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0 && resend) {
      setResend(false); // enable button again
    }
    return () => clearInterval(interval);
  }, [resend, timer]);

  const handleValidate = async () => {
    if (!code.trim() || code.length < 6) {
      setError('Please enter a valid 6-digit code.');
      toast.show('Please enter a valid 6-digit code.', { type: 'danger' });
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
        email: email, // ✅ Email from previous screen
        otp: code,
      });

      console.log('OTP Verification Response:', response.data);

      toast.show(response.data.message || 'Verification successful!', {
        type: 'success',
      });

      navigation.navigate('Login');
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || 'Invalid OTP. Please try again.';
      console.log('OTP Verification Error:', err.response?.data || err.message);
      toast.show(errorMsg, { type: 'danger' });
    } finally {
      setLoading(false);
    }
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
                  // placeholder={error ? error : '123456'}
                  // placeholderTextColor={error ? 'red' : '#999'}
                  className="bg-textLight w-full h-14 text-primary rounded-md text-lg font-llewie px-4"
                  keyboardType="number-pad"
                  maxLength={6}
                />
              </View>

              {/* Submit Button */}
              <View className="w-full px-4 items-center mt-2">
                <TouchableOpacity
                  className="bg-highlight mt-6 rounded-md w-full h-16 items-center justify-center"
                  onPress={handleValidate}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text className="text-textLight pt-1 h-12 text-4xl font-llewie text-center">
                      Validate
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Help */}
              <View className="flex flex-row justify-center items-center gap-2">
                <Text className="text-textLight text-md font-llewie">
                  Didn't receive a code?
                </Text>
                <TouchableOpacity disabled={resend} onPress={handleResend}>
                  <Text
                    className={`${
                      resend ? 'text-gray-400' : 'text-secondary'
                    }  text-md font-llewie`}
                  >
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
              {resend && (
                <View className="flex flex-row justify-center items-center gap-2">
                  <Text className="text-textLight text-md font-llewie">
                    00:0{timer}
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

export default VerificationScreen;
