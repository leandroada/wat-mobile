import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';

const PrivacyScreen = () => {
  const [profileVisibility, setProfileVisibility] = useState<
    'Public' | 'Friends' | 'Private'
  >('Public');

  const [analyticsOptIn, setAnalyticsOptIn] = useState<'Opt-In' | 'Opt-Out'>(
    'Opt-In',
  );

  const [password, setPassword] = useState('');

  const visibilityOptions: ('Public' | 'Friends' | 'Private')[] = [
    'Public',
    'Friends',
    'Private',
  ];

  const analyticsOptions: ('Opt-In' | 'Opt-Out')[] = ['Opt-In', 'Opt-Out'];

  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 5,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          <View className="w-full">
            {/* Header */}
            <View className="mb-6 items-center">
              <CustomHeader />
            </View>

            {/* Content */}
            <View className="w-full h-full px-12 py-8 bg-textLight">
              <Text className="font-llewie text-primary pr-9  h-48 text-6xl mb-5">
                Privacy and Security
              </Text>

              {/* Profile Visibility */}
              <View className="mb-10">
                <Text className="font-llewie text-primary text-4xl mb-4">
                  Profile Visibility
                </Text>
                <View className="flex-row justify-between">
                  {visibilityOptions.map(option => {
                    const isSelected = profileVisibility === option;
                    const isFirst = option === 'Public';
                    const isLast = option === 'Private';

                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => setProfileVisibility(option)}
                        className={[
                          'flex-1 py-1 items-center',
                          isSelected ? 'bg-primary' : 'bg-secondary',
                          isFirst ? 'rounded-l-lg' : '',
                          isLast ? 'rounded-r-lg' : '',
                        ].join(' ')}
                      >
                        <Text className="font-llewie text-2xl text-white">
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Analytics & Crash Reports */}
              <View className="mb-10">
                <Text className="font-llewie text-primary text-4xl mb-4">
                  Analytics & Crash Reports Opt-In
                </Text>
                <View className="flex-row justify-between">
                  {analyticsOptions.map(option => {
                    const isSelected = analyticsOptIn === option;
                    const isFirst = option === 'Opt-In';
                    const isLast = option === 'Opt-Out';

                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => setAnalyticsOptIn(option)}
                        className={[
                          'flex-1 py-1 items-center',
                          isSelected ? 'bg-primary' : 'bg-secondary',
                          isFirst ? 'rounded-l-lg' : '',
                          isLast ? 'rounded-r-lg' : '',
                        ].join(' ')}
                      >
                        <Text className="font-llewie text-2xl text-white">
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Change Password / Set Passcode */}
              <View className="mb-4">
                <Text className="font-llewie text-primary text-4xl mb-4">
                  Change Password / Set Passcode
                </Text>
                <Text className="font-llewie text-primary text-2xl mb-1">
                  New Password
                </Text>
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor="#999"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  className="bg-[#D9D9D9] px-4 py-2 rounded-lg text-xl font-llewie text-primary"
                />
              </View>

              {/* Reset Button */}
              <TouchableOpacity className="bg-secondary py-3 mx-8  rounded-xl items-center">
                <Text className="font-llewie text-textLight text-2xl">Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PrivacyScreen;
