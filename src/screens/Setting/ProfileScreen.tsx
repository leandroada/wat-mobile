import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomHeader from '../../components/CustomHeader';
import CircleImage from '../../components/CircleImage';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useUser } from '../../context/UserContext'; // <-- Import context
import { useToast } from 'react-native-toast-notifications';

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
};

const ProfileScreen: React.FC = () => {
  const { user, updateUserProfile, uploadAvatar } = useUser();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const toast = useToast();

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false); // <-- Loading state

  /** Load user data into form when available */
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      setImageUri(user.avatar);
    }
  }, [user]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri || null);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedFields: Partial<FormState> = {};

      // Compare current form values with the original user data
      if (form.firstName !== (user?.firstName || '')) {
        updatedFields.firstName = form.firstName;
      }
      if (form.lastName !== (user?.lastName || '')) {
        updatedFields.lastName = form.lastName;
      }
      if (form.username !== (user?.username || '')) {
        updatedFields.username = form.username;
      }
      if (form.email !== (user?.email || '')) {
        updatedFields.email = form.email;
      }
      if (form.phone) {
        updatedFields.phone = form.phone;
      }

      // Call update API only if something changed
      if (Object.keys(updatedFields).length > 0) {
        await updateUserProfile(updatedFields);
      }
      if (imageUri && imageUri !== user?.avatar) {
        await uploadAvatar(imageUri);
      }
    toast.show('Profile updated successfully.', {
      type: 'success',
    });
    } catch (error) {
      console.error('Update Error:', error);
    toast.show('Failed to update profile.', {
      type: 'danger',
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-primary -z-10">
      {/* Top 20% Background Dots */}
      <View
        style={{
          position: 'absolute',
          top: 10,
          width: '100%',
          height: responsiveHeight(20),
          zIndex: -1,
        }}
      >
        <Image
          source={require('../../assets/images/bg-pattern-large.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: 1.2 }],
          }}
        />
      </View>
      <SafeAreaView edges={['top']} className="flex-1">
        <KeyboardAvoidingView className="flex-1" behavior="padding">
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
              <View className="w-full px-8 py-4 flex-1 bg-textLight rounded-t-3xl">
                <Text
                  className="font-llewie text-primary"
                  style={{ fontSize: responsiveFontSize(5.5) }}
                >
                  Profile
                </Text>

                <View className="flex flex-row items-center mt-4">
                  <CircleImage
                    image={
                      imageUri ||
                      'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                    }
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
                      <Text className="font-llewie text-primary text-xl mb-1">
                        First Name
                      </Text>
                      <TextInput
                        value={form.firstName}
                        onChangeText={text => handleChange('firstName', text)}
                        className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                      />
                    </View>
                    <View className="mb-4 w-[45%]">
                      <Text className="font-llewie text-primary text-xl mb-1">
                        Last Name
                      </Text>
                      <TextInput
                        value={form.lastName}
                        onChangeText={text => handleChange('lastName', text)}
                        className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                      />
                    </View>
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">
                      Username
                    </Text>
                    <TextInput
                      value={form.username}
                      onChangeText={text => handleChange('username', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">
                      Email
                    </Text>
                    <TextInput
                      value={form.email}
                      onChangeText={text => handleChange('email', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <View className="mb-4">
                    <Text className="font-llewie text-primary text-xl mb-1">
                      Phone
                    </Text>
                    <TextInput
                      value={form.phone}
                      onChangeText={text => handleChange('phone', text)}
                      className="bg-[#D9D9D9] px-4 py-1 rounded-lg text-xl font-llewie text-primary"
                    />
                  </View>

                  <TouchableOpacity
                    onPress={handleUpdate}
                    className="bg-secondary py-3 mx-24 mt-2 rounded-xl items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      <Text className="font-llewie text-textDark text-3xl">
                        Update
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
