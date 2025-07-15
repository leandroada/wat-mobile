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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import Logo from '../../components/Logo';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const newErrors = {
      username: username ? '' : 'Username is required.',
      firstName: firstName ? '' : 'First name is required.',
      lastName: lastName ? '' : 'Last name is required.',
      email: email
        ? validateEmail(email)
          ? ''
          : 'Invalid email format.'
        : 'Email is required.',
      password: password ? '' : 'Password is required.',
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(msg => msg !== '');
    if (hasError) return;

    try {
      console.log('Form submitted', {
        username,
        firstName,
        lastName,
        email,
        password,
      });
      navigation.navigate('Verification');
    } catch (err) {
      console.log('Error sending form data', err);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_signUp.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1 relative">
        {/* Bottom Background Image Behind ScrollView */}
        <Image
          source={require('../../assets/images/characters.png')}
          resizeMode="contain"
          className="w-full h-64 absolute bottom-0 z-0 opacity-60"
        />
        {/* Logo */}
        <View className="mt-4 mb-4 flex justify-center items-center">
          <Logo width={220} height={70} />
        </View>

        <KeyboardAvoidingView behavior={'padding'} className="flex-1">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{
                alignItems: 'center',
                // paddingTop: 20,
                // paddingBottom: 100,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              className="z-10"
            >
              <View className="w-[30rem] gap-8 px-4">
                {/* Input Fields */}
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
                      <Text className="text-white text-[30px] font-llewie">
                        {label}
                      </Text>
                      <TextInput
                        value={value}
                        onChangeText={set}
                        keyboardType={keyboardType}
                        secureTextEntry={secureTextEntry}
                        placeholder={error !== '' ? error : label}
                        placeholderTextColor={error !== '' ? 'red' : 'gray'}
                        className="bg-white w-[65%] h-12 rounded-md text-lg font-llewie px-3"
                      />

                      {/* {error !== '' && (
                        <Text className="text-red-500 text-base font-llewie">
                          {error}
                        </Text>
                      )} */}
                    </View>
                  ),
                )}

                {/* Submit Button */}
                <View className="w-full px-4 items-center">
                  <TouchableOpacity
                    className="bg-highlight mt-6 rounded-md w-[90%] h-16 items-center justify-center"
                    onPress={onSubmit}
                  >
                    <Text className="text-white text-4xl font-llewie text-center">
                      Submit
                    </Text>
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
