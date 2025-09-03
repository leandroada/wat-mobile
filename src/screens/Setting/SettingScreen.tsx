import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import CircleImage from '../../components/CircleImage';
import CustomHeader from '../../components/CustomHeader';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CrownIcon from '../../assets/icons/CrownIcon';
import { useAuth } from '../../context/AuthContext';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useUser } from '../../context/UserContext';

type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};
const SettingScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { logout } = useAuth();
    const { user, updateUserProfile, uploadAvatar } = useUser();
      const [imageUri, setImageUri] = useState<string | null>(null);
      const [data, setData] = useState<UserData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
      });
  useEffect(() => {
    if (user) {
      setData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
      });
      setImageUri(user.avatar);
    }
  }, [user]);
  const HandleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-primary -z-10">
      {/* Top 20% Background Dots */}
      <View
        style={{
          position: 'absolute',
          top: 28,
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
            paddingBottom: responsiveHeight(5),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full">
            {/* Header */}
            <View className="mb-4 items-center">
              <CustomHeader />
            </View>

            {/* User Card */}
            <View className="px-8 py-4 mb-2">
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-2">
                  <CircleImage
                    image={imageUri || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'}
                    size={responsiveWidth(15)}
                  />
                  <View>
                    <Text
                      className="text-white font-llewie"
                      style={{ fontSize: responsiveFontSize(2) }}
                    >
                      RANK #234
                    </Text>
                    <Text
                      className="text-white font-llewie"
                      style={{ fontSize: responsiveFontSize(3) }}
                    >
                      AL_25
                    </Text>
                  </View>
                </View>
                <View className="items-center justify-center ">
                  <Text
                    className="text-white font-llewie"
                    style={{
                      letterSpacing: 5,
                      fontSize: responsiveFontSize(1.7),
                    }}
                  >
                    POINTS:300
                  </Text>
                  <View
                    className="flex-row justify-center items-end"
                    style={{ marginTop: responsiveWidth(-1) }}
                  >
                    <CrownIcon
                      width={responsiveWidth(7.5)}
                      height={responsiveWidth(7.5)}
                    />
                    <CrownIcon
                      width={responsiveWidth(8)}
                      height={responsiveWidth(8)}
                    />
                    <CrownIcon
                      width={responsiveWidth(8.5)}
                      height={responsiveWidth(8.5)}
                    />
                    <CrownIcon
                      width={responsiveWidth(9)}
                      height={responsiveWidth(9)}
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Settings Options */}
            <View className="w-full bg-textLight px-6 pt-8 pb-16 rounded-t-3xl h-full">
              <Text
                className="font-llewie text-primary"
                style={{ fontSize: responsiveFontSize(5) }}
              >
                Settings
              </Text>

              <View className="mt-5">
                {[
                  // { label: 'General', screen: 'General' },
                  { label: 'Profile', screen: 'Profile' },
                  { label: 'Audio', screen: 'Audio' },
                  { label: 'Notifications', screen: 'Notification' },
                  { label: 'Privacy and Security', screen: 'Privacy' },
                  { label: 'Support', screen: 'Support' },
                  { label: 'About', screen: 'About' },
                ].map(({ label, screen }) => (
                  <TouchableOpacity
                    key={label}
                    onPress={() =>
                      navigation.navigate(screen)
                    }
                  >
                    <Text
                      className="font-llewie text-primary mt-0"
                      style={{ fontSize: responsiveFontSize(3.5) }}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View className="mt-12">
                <TouchableOpacity onPress={HandleLogout}>
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    Sign Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;
