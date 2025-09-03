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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import { useAuth } from '../../context/AuthContext';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import { useToast } from 'react-native-toast-notifications';
import { Ionicons } from '@react-native-vector-icons/ionicons';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { login } = useAuth();
  const isKeyboardVisible = useKeyboardVisible();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ emailOrUsername: '', password: '' });
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleLogin = async () => {
    const newErrors = {
      emailOrUsername: emailOrUsername ? '' : 'Email/Username required',
      password: password ? '' : 'Password required',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(err => err !== '')) return;

    try {
      setLoading(true); // ✅ Show loader
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        emailOrUsername,
        password,
      });

      const { message, data } = response.data;
      console.log('Login API Response:', response.data);

      toast.show(message, { type: 'success' });

      // ✅ Save token & email in AsyncStorage
      await login(data.user.username, data.user.id, data.token);

      // ✅ Navigate to Home or Dashboard
      // navigation.navigate('HomeScreen');
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.error.message ||
        'Invalid credentials. Please try again.';
      toast.show(errorMsg, { type: 'danger' });
      console.log('Login API Error:', error.response?.data || error.message);
    } finally {
      setLoading(false); // ✅ Hide loader
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          edges={['top']}
          className="flex-1 items-center justify-center"
        >
          <View className="w-full h-full relative items-center ">
            {/* Logo */}
            <Logo width={220} height={70} />

            {/* Form */}
            <View
              className="w-full px-6 flex items-center gap-7 z-10m mt-12"
              style={{ paddingTop: responsiveHeight(3) }}
            >
              {/* Email/Username */}
              <View className="w-full items-center gap-4">
                <Text
                  className="text-textLight font-llewie"
                  style={{ fontSize: responsiveFontSize(4) }}
                >
                  Email or Username
                </Text>
                <TextInput
                  value={emailOrUsername}
                  onChangeText={setEmailOrUsername}
                  // placeholder={
                  //   errors.emailOrUsername || 'Enter email or username'
                  // }
                  // placeholderTextColor={errors.emailOrUsername ? 'red' : '#666'}
                  className="bg-textLight rounded-md font-llewie text-primary px-4"
                  style={{
                    width: responsiveWidth(75),
                    height: responsiveHeight(5.5),
                    fontSize: responsiveFontSize(1.8),
                  }}
                />
              </View>

              {/* Password */}
              <View className="w-full items-center gap-4">
                <Text
                  className="text-textLight font-llewie"
                  style={{ fontSize: responsiveFontSize(4) }}
                >
                  Password
                </Text>
                <View className='relative'>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="bg-textLight rounded-md font-llewie px-4 text-textDark"
                    style={{
                      width: responsiveWidth(75),
                      height: responsiveHeight(5.5),
                      fontSize: responsiveFontSize(1.8),
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-3 '
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'} // 👈 toggle icons
                      size={22}
                      color="#666"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <View className="w-full items-center mt-2">
                <TouchableOpacity
                  className="bg-highlight rounded-md items-center justify-center"
                  style={{
                    width: responsiveWidth(80),
                    height: responsiveHeight(7),
                    marginTop: responsiveHeight(2),
                  }}
                  onPress={handleLogin}
                  disabled={loading} // ✅ Disable button when loading
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text
                      className="text-textLight font-llewie text-center"
                      style={{ fontSize: responsiveFontSize(3.5) }}
                    >
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View>
                {/* Forgot username */}
                <View className="flex-row justify-center items-center gap-2 mt-8 mb-2">
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(1.8) }}
                  >
                    Forgot Username?
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      className="text-secondary font-llewie"
                      style={{ fontSize: responsiveFontSize(1.8) }}
                    >
                      Get Help
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* Forgot Password */}
                <View className="flex-row justify-center items-center gap-2">
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(1.8) }}
                  >
                    Forgot Password?
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      className="text-secondary font-llewie"
                      style={{ fontSize: responsiveFontSize(1.8) }}
                    >
                      Get Help
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Create Account */}
                <View className="flex-row justify-center items-center gap-2 mt-8 mb-6">
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(1.8) }}
                  >
                    Need an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                  >
                    <Text
                      className="text-secondary font-llewie"
                      style={{ fontSize: responsiveFontSize(1.8) }}
                    >
                      Create an Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom Character Image */}
            {!isKeyboardVisible && (
              <Image
                source={require('../../assets/images/character_img.png')}
                resizeMode="contain"
                className="absolute bottom-0 -z-10"
                style={{ width: '100%', height: responsiveWidth(55) }}
              />
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default LoginScreen;
