import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
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
import { useUser } from '../../context/UserContext';
import Share from 'react-native-share';
type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};
const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(responsiveHeight(100)))[0];
  const navigation = useNavigation<RegisterScreenNavigationProp>();
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
  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(slideAnim, {
        toValue: 10, // final position
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);
  const onShare = async () => {
    try {
      await Share.open({
        title: 'Join me on The Bible With a Twist!',
        subject: 'Invite to The Bible With a Twist',
        message:
          'Hey! 👋 I’m inviting you to try this awesome game, The Bible With a Twist. Download it here: https://withatwist.vcern.com',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

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
          <View className="w-full  ">
            <View className="w-full px-6">
              {/* Logo */}
              <View className="mb-4 items-center">
                <Logo
                  width={responsiveWidth(55)}
                  height={responsiveHeight(8)}
                />
              </View>

              {/* First Card */}
              <View className="w-full gap-6 border-4 border-secondary rounded-2xl p-4 ">
                <View className="flex flex-row justify-between items-center">
                  <View className="flex flex-row items-center gap-2">
                    <CircleImage
                      image={
                        imageUri ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                      }
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
                  <View className="items-center">
                    <Text
                      className="text-white font-llewie "
                      style={{ fontSize: responsiveFontSize(1.8) }}
                    >
                      POINTS:300
                    </Text>
                    <View className="flex-row justify-center items-end">
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

                {/* Level */}
                <View className="w-[90%] self-center items-center pb-3">
                  <View className="flex flex-row justify-center items-center gap-4">
                    <CrownIcon
                      width={responsiveWidth(8.5)}
                      height={responsiveWidth(8.5)}
                    />
                    <Text
                      className="text-white font-llewie mt-2"
                      style={{ fontSize: responsiveFontSize(3) }}
                    >
                      LEVEL 98
                    </Text>
                  </View>
                  <Text
                    className="text-white font-llewie mb-2"
                    style={{ fontSize: responsiveFontSize(2) }}
                  >
                    130 Points Until Level 99
                  </Text>
                  <ProgressBar progress={0.8} height={responsiveHeight(2.2)} />
                </View>
              </View>

              {/* Daily Challenge */}
              <View className="mt-4 items-center">
                <TouchableOpacity
                  className="bg-highlight rounded-xl w-full flex flex-row items-center my-4"
                  style={{
                    height: responsiveHeight(7.3),
                    gap: responsiveWidth(3),
                  }}
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
                  <View>
                    <Text
                      className="text-textLight font-llewie"
                      style={{ fontSize: responsiveFontSize(2.3) }}
                    >
                      Play Daily Challenge
                    </Text>
                    <Text
                      className="text-secondary font-llewie text-center"
                      style={{ fontSize: responsiveFontSize(1.6) }}
                    >
                      10 of 10 Challenges Left
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Buttons */}
              <View className="flex-row justify-between mt-1">
                <TouchableOpacity
                  className="bg-secondary rounded-xl items-center justify-center"
                  style={{ width: '48%', height: responsiveHeight(7.3) }}
                  onPress={() => navigation.navigate('GameSelection')}
                >
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(2.5) }}
                  >
                    New Game
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-secondary rounded-xl items-center justify-center"
                  style={{ width: '48%', height: responsiveHeight(7.3) }}
                  onPress={() => console.log('Tutorial')}
                >
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(2.5) }}
                  >
                    Tutorial
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Friends */}
              <View className="mt-1 items-center">
                <TouchableOpacity
                  className="bg-highlight rounded-xl w-full items-center justify-center my-4"
                  style={{ height: responsiveHeight(7.3) }}
                  onPress={() => navigation.navigate('MyFriends')}
                >
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(2.5) }}
                  >
                    My Circle
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mt-1 items-center">
                <TouchableOpacity
                  className="bg-secondary rounded-xl items-center justify-center"
                  style={{ width: '48%', height: responsiveHeight(7.3) }}
                  onPress={() => onShare()}
                >
                  <Text
                    className="text-textLight font-llewie"
                    style={{ fontSize: responsiveFontSize(2.5) }}
                  >
                    Invite Friends
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              className=" relative -z-20"
              style={{ width: '100%', height: responsiveWidth(43) }}
            >
              <Image
                source={require('../../assets/images/character_home_img.png')}
                resizeMode="contain"
                className=" -z-10 absolute -bottom-3 "
                style={{ width: '100%', height: responsiveWidth(43) }}
              />
            </View>

            <View />
          </View>
        </ScrollView>
        {/* Bottom Section */}
        {/* {isModalVisible && (
          <Animated.View
            className="w-full px-4"
            style={{
              padding: responsiveWidth(1.5),
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View
              className="w-full border-4 border-secondary rounded-xl mt-2 bg-primary"
              style={{ padding: responsiveWidth(1) }}
            >
              <View>
                <Text
                  className="text-white font-llewie text-center mt-2"
                  style={{ fontSize: responsiveFontSize(1.8) }}
                >
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
                  className="bg-secondary rounded-xl items-center justify-center"
                  style={{ width: '40%', height: responsiveHeight(5.2) }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    className="text-highlight font-llewie"
                    style={{ fontSize: responsiveFontSize(2.1) }}
                  >
                    Yes!
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-secondary rounded-xl items-center justify-center"
                  style={{ width: '40%', height: responsiveHeight(5.2) }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    className="text-highlight font-llewie"
                    style={{ fontSize: responsiveFontSize(2.1) }}
                  >
                    No Thanks
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )} */}
        {/* <Image
          source={require('../../assets/images/character_home_img.png')}
          resizeMode="contain"
          className="absolute -bottom-44 -z-10"
          style={{ width: '100%', height: responsiveWidth(65) }}
        /> */}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
