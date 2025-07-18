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
import ProgressBar from '../../components/ProgressBar';
import { RootStackParamList } from '../../types/navigation';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CrownIcon from '../../assets/icons/CrownIcon';

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <ImageBackground
      source={require('../../assets/images/bg_Home.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          contentContainerStyle={{
            paddingTop: responsiveHeight(2),
            paddingBottom: responsiveHeight(1),
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full px-6">
            {/* Logo */}
            <View className="mb-4 items-center">
              <Logo
                width={responsiveWidth(55)}
                height={responsiveHeight(8)}
              />
            </View>

            {/* First Card */}
            <View className="w-full gap-6 border-4 border-secondary rounded-2xl p-4 " >
              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-2">
                  <CircleImage
                    image="https://randomuser.me/api/portraits/men/5.jpg"
                    size={responsiveWidth(15)}
                  />
                  <View>
                    <Text className="text-white font-llewie" style={{ fontSize: responsiveFontSize(2) }}>
                      RANK #234
                    </Text>
                    <Text className="text-white font-llewie" style={{ fontSize: responsiveFontSize(3) }}>
                      AL_25
                    </Text>
                  </View>
                </View>
                <View className="items-center">
                  <Text className="text-white font-llewie " style={{ fontSize: responsiveFontSize(1.8) }}>
                    POINTS:300
                  </Text>
                  <View className="flex-row justify-center items-end">
                    <CrownIcon width={responsiveWidth(7.5)} height={responsiveWidth(7.5)} />
                    <CrownIcon width={responsiveWidth(8)} height={responsiveWidth(8)} />
                    <CrownIcon width={responsiveWidth(8.5)} height={responsiveWidth(8.5)} />
                    <CrownIcon width={responsiveWidth(9)} height={responsiveWidth(9)} />
                  </View>
                </View>
              </View>

              {/* Level */}
              <View className="w-[90%] self-center items-center pb-3">
                <View className="flex flex-row justify-center items-center gap-4">
                  <CrownIcon width={responsiveWidth(8.5)} height={responsiveWidth(8.5)} />
                  <Text className="text-white font-llewie mt-2" style={{ fontSize: responsiveFontSize(3) }}>
                    LEVEL 98
                  </Text>
                </View>
                <Text className="text-white font-llewie mb-2" style={{ fontSize: responsiveFontSize(2) }}>
                  130 Points Until Level 99
                </Text>
                <ProgressBar progress={0.8} height={responsiveHeight(2.2)} />
              </View>
            </View>

            {/* Daily Challenge */}
            <View className="mt-6 items-center">
              <TouchableOpacity
                className="bg-highlight rounded-lg w-full flex flex-row items-center my-4" 
                style={{ height: responsiveHeight(7.5) , gap: responsiveWidth(2) }}
                onPress={() => console.log('Login Pressed')}
              >
                <Image
                  source={require('../../assets/images/book_img.png')}
                  resizeMode="contain"
                  style={{
                    width: responsiveWidth(25),
                    height: responsiveWidth(25),
                    marginLeft: responsiveWidth(0),
                  }}
                />
                <Text className="text-textLight font-llewie" style={{ fontSize: responsiveFontSize(2.5) }}>
                  Play Daily Challenge
                </Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between mt-3">
              <TouchableOpacity
                className="bg-secondary rounded-lg items-center justify-center"
                style={{ width: '48%', height: responsiveHeight(7.5) }}
                onPress={() => navigation.navigate('GameSelection')}
              >
                <Text className="text-textLight font-llewie" style={{ fontSize: responsiveFontSize(2.5) }}>
                  New Game
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-secondary rounded-lg items-center justify-center"
                style={{ width: '48%', height: responsiveHeight(7.5) }}
                onPress={() => console.log('Tutorial')}
              >
                <Text className="text-textLight font-llewie" style={{ fontSize: responsiveFontSize(2.5) }}>
                  Tutorial
                </Text>
              </TouchableOpacity>
            </View>

            {/* Friends */}
            <View className="mt-4 items-center">
              <TouchableOpacity
                className="bg-highlight rounded-lg w-full items-center justify-center my-4"
                style={{ height: responsiveHeight(7.5) }}
                onPress={() => navigation.navigate('MyFriends')}
              >
                <Text className="text-textLight font-llewie" style={{ fontSize: responsiveFontSize(2.5) }}>
                  My Friends
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View className="w-full border-4 border-secondary rounded-2xl mt-2" style={{ padding: responsiveWidth(1.5) }}>
              <View>
                <Text className="text-white font-llewie text-center mt-2" style={{ fontSize: responsiveFontSize(1.8) }}>
                  Hey AL_25
                </Text>
                <Text
                  className="text-white font-llewie text-center"
                  style={{
                    fontSize: responsiveFontSize(1.8),
                    marginTop: -responsiveHeight(0.5),
                  }}
                >
                  Would you like to resume your game?
                </Text>
              </View>
              <View className="flex-row justify-around mt-3 px-4 gap-8 pb-7">
                <TouchableOpacity
                  className="bg-secondary rounded-lg items-center justify-center"
                  style={{ width: '40%', height: responsiveHeight(5.2) }}
                  onPress={() => console.log('New Game')}
                >
                  <Text className="text-highlight font-llewie" style={{ fontSize: responsiveFontSize(2.1) }}>
                    Yes!
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-secondary rounded-lg items-center justify-center"
                  style={{ width: '40%', height: responsiveHeight(5.2) }}
                  onPress={() => console.log('Tutorial')}
                >
                  <Text className="text-highlight font-llewie" style={{ fontSize: responsiveFontSize(2.1) }}>
                    No Thanks
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
