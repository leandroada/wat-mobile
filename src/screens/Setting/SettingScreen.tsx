import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
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
import { useAuth } from '../../redux/AuthContext';
type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
const SettingScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { logout } = useAuth();
  const HandleLogout = async()=>{
    await logout()

  }
  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="contain"
      className="flex-1 bg-primary"
      // imageStyle={{
      //   position: 'absolute', // needed for shifting
      //   top: -40, // shift image upward
      //   right: 20, // shift image to the left
      // }}
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="w-full ">
          {/* Logo */}
          <View className="mb-4 items-center">
            <CustomHeader />
          </View>
          {/* user detail card */}
          <View className="px-8 py-4 mb-2">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center gap-2">
                <CircleImage
                  image="https://randomuser.me/api/portraits/men/32.jpg"
                  size={70}
                />
                <View>
                  <Text className="text-white text-2xl font-llewie">
                    RANK #234
                  </Text>
                  <Text className="text-white text-4xl font-llewie">AL_25</Text>
                </View>
              </View>
              <View className="items-center">
                <Text
                  className="text-white text-md font-llewie pb-2"
                  style={{ letterSpacing: 5 }}
                >
                  POINTS:300
                </Text>

                <Text className="text-2xl">
                  <CrownIcon width={30} height={30} />
                  <CrownIcon width={30} height={30} />
                  <CrownIcon width={30} height={30} />
                  <CrownIcon width={30} height={30} />
                </Text>
              </View>
            </View>
          </View>
          {/* Settings Options */}
          <View className="w-full h-full p-10 bg-textLight">
            <Text className="font-llewie h-auto mt-2 text-primary text-[4rem]">
              Settings
            </Text>
            <View className="flex gap-2 px-2 mt-9">
              <TouchableOpacity onPress={() => navigation.navigate('General')}>
                <Text className="font-llewie text-primary text-4xl">
                  General
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Audio')}>
                <Text className="font-llewie text-primary text-4xl">Audio</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
              >
                <Text className="font-llewie text-primary text-4xl">
                  Notifications
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                <Text className="font-llewie text-primary text-4xl ">
                  Privacy and Security
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text className="font-llewie text-primary text-4xl ">
                  Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Support')}>
                <Text className="font-llewie text-primary text-4xl">
                  Support
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text className="font-llewie text-primary text-4xl ">
                  About
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-12 ">
              <TouchableOpacity onPress={() => HandleLogout()}>
                <Text className="font-llewie h-auto text-primary text-[2.5rem]">
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SettingScreen;
