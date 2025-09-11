import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import Logo from '../../components/Logo';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import CheckInEllipse from '../../assets/icons/CheckInEllipse';
import { useToast } from 'react-native-toast-notifications';
import { Ionicons } from '@react-native-vector-icons/ionicons';
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const isKeyboardVisible = useKeyboardVisible();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRules = useMemo(
    () => ({
      hasMinLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  );
  const [errors, setErrors] = useState({
    username: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    // Show all non-empty error messages as toasts
    Object.values(errors).forEach(error => {
      if (error) {
        toast.show(error, { type: 'danger' });
      }
    });
  }, [errors]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmit = async () => {
    console.log('Submit button clicked ✅');

    const newErrors = {
      username: username
        ? username.length >= 3
          ? ''
          : 'Username must be at least 3 characters.'
        : 'Username is required.',
      firstName: firstName ? '' : 'First name is required.',
      lastName: lastName ? '' : 'Last name is required.',
      mobileNumber: mobileNumber ? '' : 'Mobile number is required.',
      email: email
        ? validateEmail(email)
          ? ''
          : 'Invalid email format.'
        : 'Email is required.',
      password: password
        ? password.length >= 8
          ? ''
          : 'Password must be at least 8 characters.'
        : 'Password is required.',
    };

    setErrors(newErrors);
    const hasFieldErrors = Object.values(newErrors).some(msg => msg !== '');
    const passwordFails = Object.values(passwordRules).some(
      rule => rule === false,
    );

    if (hasFieldErrors || passwordFails) {
      console.log('Validation failed ❌', newErrors);
      toast.show(
        passwordFails
          ? 'Password must meet all requirements.'
          : 'Please check your input and try again.',
        { type: 'danger' },
      );
      return;
    }

    try {
      setLoading(true);
      console.log('Sending request...', {
        userEmail: email,
        username,
        password,
        firstName,
        lastName,
        mobileNumber,
      });
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        userEmail: email,
        username,
        password,
        firstName,
        lastName,
        mobileNumber,
      });

      console.log(
        'API Response:',
        response.data,
        response.data.data.requiresVerification,
      );

      toast.show(response.data.message || 'Account created successfully!', {
        type: 'success',
      });

      if (response.data.data.requiresVerification) {
        navigation.navigate('Verification', {
          userId: response.data.data.userId,
          email: email,
        });
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.error?.message ||
        'Something went wrong. Please try again later.';

      console.log('API Error:', err.response?.data?.error?.message || err.message);
      toast.show(errorMsg, { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };
  // helper function
  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);

    if (limited.length < 4) return limited;
    if (limited.length < 7) {
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    }
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(
      6,
    )}`;
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_signUp.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1 relative">
        {!isKeyboardVisible && (
          <Image
            source={require('../../assets/images/characters.png')}
            resizeMode="contain"
            className="w-full absolute bottom-0 z-0 opacity-60"
            style={{ height: responsiveWidth(55) }}
          />
        )}

        <View className="mt-4 mb-4 flex justify-center items-center">
          <Logo width={220} height={70} />
        </View>

        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: responsiveHeight(0),
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              className="z-10 flex-1"
            >
              <View
                className="gap-3 px-4"
                style={{ width: responsiveWidth(90) }}
              >
                {[
                  {
                    label: 'Username',
                    value: username,
                    set: setUsername,
                    error: errors.username,
                  },
                  {
                    label: 'First Name',
                    value: firstName,
                    set: setFirstName,
                    error: errors.firstName,
                  },
                  {
                    label: 'Last Name',
                    value: lastName,
                    set: setLastName,
                    error: errors.lastName,
                  },
                  {
                    label: 'Mobile Number',
                    value: mobileNumber,
                    set: (text: string) =>
                      setMobileNumber(formatPhoneNumber(text)),
                    error: errors.mobileNumber,
                    keyboardType: 'number-pad' as const,
                  },

                  {
                    label: 'Email',
                    value: email,
                    set: setEmail,
                    error: errors.email,
                    keyboardType: 'email-address' as const,
                  },
                  {
                    label: 'Password',
                    value: password,
                    set: setPassword,
                    error: errors.password,
                    secureTextEntry: true,
                  },
                ].map(
                  ({
                    label,
                    value,
                    set,
                    error,
                    keyboardType,
                    secureTextEntry,
                  }) => (
                    <View key={label} className="w-full items-center gap-1">
                      <Text
                        className="text-white font-llewie"
                        style={{ fontSize: responsiveFontSize(3) }}
                      >
                        {label}
                      </Text>
                      {label !== 'Password' ? (
                        <TextInput
                          value={value}
                          onChangeText={text => {
                            if (label === 'Username' || label === 'Email') {
                              set(text.toLowerCase()); // 👈 force lowercase
                            } else {
                              set(text);
                            }
                          }}
                          autoCapitalize={
                            label === 'Username' || label === 'Email'
                              ? 'none'
                              : 'sentences'
                          }
                          autoCorrect={
                            label === 'Username' || label === 'Email'
                              ? false
                              : true
                          }
                          keyboardType={keyboardType}
                          secureTextEntry={secureTextEntry}
                          className="bg-textLight rounded-md font-llewie px-3 text-textDark"
                          style={{
                            width: responsiveWidth(63),
                            height: responsiveHeight(4.5),
                            fontSize: responsiveFontSize(1.5),
                          }}
                        />
                      ) : (
                        <View className="relative">
                          <TextInput
                            value={value}
                            onChangeText={set}
                            keyboardType={keyboardType}
                            secureTextEntry={!showPassword}
                            className="bg-textLight rounded-md font-llewie px-3 text-textDark"
                            style={{
                              width: responsiveWidth(63),
                              height: responsiveHeight(4.5),
                              fontSize: responsiveFontSize(1.5),
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[15%]"
                          >
                            <Ionicons
                              name={showPassword ? 'eye-off' : 'eye'} // 👈 toggle icons
                              size={22}
                              color="#666"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ),
                )}
                <View className="flex mt-2 gap-1">
                  <Text className="text-textLight text-xl text-center font-llewie">
                    Password must contain at least:
                  </Text>
                  <View className="flex flex-wrap flex-row gap-2 justify-center items-center">
                    <View className="flex-row items-center gap-1 ">
                      <CheckInEllipse checked={passwordRules.hasMinLength} />
                      <Text className="text-white font-llewie">
                        8 characters
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <CheckInEllipse checked={passwordRules.hasNumber} />
                      <Text className="text-white font-llewie">1 number</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <CheckInEllipse checked={passwordRules.hasUppercase} />
                      <Text className="text-white font-llewie">
                        1 uppercase
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <CheckInEllipse checked={passwordRules.hasLowercase} />
                      <Text className="text-white font-llewie">
                        1 lowercase
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <CheckInEllipse checked={passwordRules.hasSpecialChar} />
                      <Text className="text-white font-llewie">
                        1 special character
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex-row justify-center items-center gap-2 ">
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(1.9) }}
                  >
                    Have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text
                      className="text-secondary font-llewie"
                      style={{ fontSize: responsiveFontSize(1.9) }}
                    >
                      Log in here
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="w-full items-center">
                  <TouchableOpacity
                    className="bg-highlight rounded-md items-center justify-center"
                    style={{
                      width: '95%',
                      height: responsiveHeight(6.3),
                      marginTop: responsiveHeight(1),
                    }}
                    onPress={onSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <Text
                        className="text-white font-llewie text-center"
                        style={{ fontSize: responsiveFontSize(3.2) }}
                      >
                        Submit
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;
