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
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Image } from 'react-native';

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
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full">
            {/* Header */}
            <View className="mb-6 items-center">
              <CustomHeader />
            </View>

            {/* Content */}
            <View className="w-full  py-8 bg-textLight rounded-t-3xl h-full" style={{paddingHorizontal:responsiveWidth(8)}}>
              <Text
                className="font-llewie text-primary mb-5"
                style={{ fontSize: responsiveFontSize(5) }}
              >
                Privacy & Security
              </Text>

              {/* Profile Visibility */}
              <View className="mb-10">
                <Text
                  className="font-llewie text-primary mb-4"
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
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
                          'flex-1 py-2 items-center',
                          isSelected ? 'bg-primary' : 'bg-secondary',
                          isFirst ? 'rounded-l-lg' : '',
                          isLast ? 'rounded-r-lg' : '',
                        ].join(' ')}
                      >
                        <Text
                          className="font-llewie text-white"
                          style={{ fontSize: responsiveFontSize(2.2) }}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Analytics */}
              <View className="mb-10">
                <Text
                  className="font-llewie text-primary mb-4"
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
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
                          'flex-1 py-2 items-center',
                          isSelected ? 'bg-primary' : 'bg-secondary',
                          isFirst ? 'rounded-l-lg' : '',
                          isLast ? 'rounded-r-lg' : '',
                        ].join(' ')}
                      >
                        <Text
                          className="font-llewie text-white"
                          style={{ fontSize: responsiveFontSize(2.2) }}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Password */}
              <View className="mb-6">
                <Text
                  className="font-llewie text-primary mb-2"
                  style={{ fontSize: responsiveFontSize(3.5) }}
                >
                  Change Password / Set Passcode
                </Text>
                <Text
                  className="font-llewie text-primary mb-1"
                  style={{ fontSize: responsiveFontSize(2.0) }}
                >
                  New Password
                </Text>
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor="#D9D9D9"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  className="bg-[#D9D9D9] px-4 py-2 rounded-lg font-llewie text-primary"
                  style={{
                    fontSize: responsiveFontSize(2),
                  }}
                />
              </View>

              {/* Reset Button */}
              <TouchableOpacity className="bg-secondary py-3 rounded-xl items-center" style={{ marginHorizontal: responsiveWidth(12)}}>
                <Text
                  className="font-llewie text-textLight"
                  style={{ fontSize: responsiveFontSize(2.4) }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PrivacyScreen;
