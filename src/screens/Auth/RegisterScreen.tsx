import React, { useState } from 'react';
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
type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const isKeyboardVisible = useKeyboardVisible();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmit = async () => {
    console.log('Submit button clicked ✅');

    const newErrors = {
      username: username
        ? username.length >= 8
          ? ''
          : 'Username must be at least 8 characters.'
        : 'Username is required.',
      firstName: firstName ? '' : 'First name is required.',
      lastName: lastName ? '' : 'Last name is required.',
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
    const hasError = Object.values(newErrors).some(msg => msg !== '');
    if (hasError) {
      console.log('Validation failed ❌', newErrors);
      Alert.alert('Validation Error', 'Please correct the highlighted fields.');
      return;
    }

    try {
      setLoading(true);
      console.log('Sending request...' ,         {
          userEmail: email,
          username,
          password,
          firstName,
          lastName,
        });
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup`,
        {
          userEmail: email,
          username,
          password,
          firstName,
          lastName,
        }
      );

      console.log('API Response:', response.data);

      Alert.alert(
        'Success',
        response.data.message || 'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              if (response.data.requiresVerification) {
                navigation.navigate('Verification', {
                  userId: response.data.userId,
                  email: email,
                });
              }
            },
          },
        ]
      );
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        'Something went wrong. Please try again later.';

      console.log('API Error:', err.response?.data || err.message);
      Alert.alert('Error', errorMsg, [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
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

        <KeyboardAvoidingView
          behavior="padding"
          className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                paddingBottom: responsiveHeight(8),
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              className="z-10"
            >
              <View
                className="gap-8 px-4"
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
                      <TextInput
                        value={value}
                        onChangeText={set}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        placeholder={error !== '' ? error : label}
                        placeholderTextColor={error !== '' ? 'red' : 'gray'}
                        className="bg-white rounded-md text-primary font-llewie px-3"
                        style={{
                          width: '75%',
                          height: responsiveHeight(5),
                          fontSize: responsiveFontSize(1.5),
                        }}
                      />
                    </View>
                  )
                )}

                <View className="w-full items-center">
                  <TouchableOpacity
                    className="bg-highlight rounded-md items-center justify-center"
                    style={{
                      width: '90%',
                      height: responsiveHeight(6.3),
                      marginTop: responsiveHeight(4),
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