import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import CustomHeader from '../../components/CustomHeader';
import CircleImage from '../../components/CircleImage';

const screenHeight = Dimensions.get('window').height;

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
};

const ProfileScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  });

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key as keyof FormState]);
    }
    if (imageUri) {
      formData.append('profileImage', {
        uri: imageUri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      } as any);
    }

    try {
      const response = await axios.post('https://your-api.com/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Success', 'Profile updated successfully.');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <KeyboardAvoidingView
          className="flex-1"
          behavior="padding"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              className="flex-1"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View className="mb-6 items-center mt-4">
                <CustomHeader />
              </View>

              {/* White Background Container */}
              <View
                className="w-full px-8 py-4 bg-textLight rounded-t-3xl"
                // style={{ minHeight: screenHeight }}
              >
                <Text className="font-llewie text-primary text-[4rem]">Profile</Text>

                <View className="flex flex-row items-center mt-4">
                  <CircleImage
                    image={imageUri || 'https://randomuser.me/api/portraits/men/32.jpg'}
                    size={90}
                  />
                  <TouchableOpacity
                    onPress={handleImagePick}
                    className="bg-secondary rounded-lg ml-10"
                  >
                    <Text className="font-llewie px-6 py-3">Choose Image</Text>
                  </TouchableOpacity>
                </View>

                {/* Form */}
                <View className="mt-8">
                  <View className="flex flex-row justify-between">
                    <View className="mb-4 w-[45%]">
                      <Text className="font-llewie text-primary text-xl mb-1">First Name</Text>
                      <TextInput
                        value={form.firstName}
                        onChangeText={(text) => handleChange('firstName', text)}
                        className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                      />
                    </View>
                    <View className="mb-4 w-[45%]">
                      <Text className="font-llewie text-primary text-xl mb-1">Last Name</Text>
                      <TextInput
                        value={form.lastName}
                        onChangeText={(text) => handleChange('lastName', text)}
                        className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                      />
                    </View>
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">Username</Text>
                    <TextInput
                      value={form.username}
                      onChangeText={(text) => handleChange('username', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">Password</Text>
                    <TextInput
                      secureTextEntry
                      value={form.password}
                      onChangeText={(text) => handleChange('password', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">Email</Text>
                    <TextInput
                      value={form.email}
                      onChangeText={(text) => handleChange('email', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">Phone</Text>
                    <TextInput
                      value={form.phone}
                      onChangeText={(text) => handleChange('phone', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <TouchableOpacity
                    onPress={handleUpdate}
                    className="bg-secondary py-3 mx-24 mt-2 rounded-xl items-center"
                  >
                    <Text className="font-llewie text-textDark text-3xl">Update</Text>
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

export default ProfileScreen;
