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
            paddingTop: 16,
            paddingBottom: 5,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={true}
        >
          <View className="w-full px-6">
            {/* Logo */}
            <View className="mb-4 items-center">
              <Logo width={220} height={70} />
            </View>

            {/* First Card */}
            <View className="w-full min-h-[15rem] gap-6 border-4 border-secondary rounded-2xl p-4">
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
                    <Text className="text-white text-4xl font-llewie">
                      AL_25
                    </Text>
                  </View>
                </View>
                <View className="items-center">
                  <Text className="text-white text-md font-llewie pb-2">
                    POINTS:300
                  </Text>
                  <Text className="text-2xl">
                    <CrownIcon width={35} height={35} />
                    <CrownIcon width={35} height={35} />
                    <CrownIcon width={35} height={35} />
                    <CrownIcon width={35} height={35} />
                  </Text>
                </View>
              </View>

              {/* Level */}
              <View className="w-[90%] self-center items-center">
                <View className="flex flex-row justify-center items-center gap-4">
                  <CrownIcon width={35} height={35} />
                  <Text className="text-white text-3xl font-llewie mt-2 ">
                    LEVEL 98
                  </Text>
                </View>

                <Text className="text-white text-xl font-llewie mb-2">
                  130 Points Until Level 99
                </Text>
                <ProgressBar progress={0.8} height={19} />
              </View>
            </View>

            {/* Daily Challenge */}
            <View className="mt-6 items-center">
              <TouchableOpacity
                className="bg-highlight rounded-lg w-full h-[4.5rem] my-4 flex flex-row items-center gap-5"
                onPress={() => console.log('Login Pressed')}
              >
                <Image
                  source={require('../../assets/images/book_img.png')}
                  resizeMode="contain"
                  className="w-[7.5rem] h-[7.5rem]"
                />
                <Text className="text-textLight text-2xl font-llewie">
                  Play daily Challenge
                </Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between mt-3">
              <TouchableOpacity
                className="bg-secondary rounded-lg w-[48%] h-[4.5rem] items-center justify-center"
                onPress={() => navigation.navigate('GameSelection')}
              >
                <Text className="text-textLight text-2xl font-llewie">
                  New Game
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-secondary rounded-lg w-[48%] h-[4.5rem] items-center justify-center"
                onPress={() => console.log('Tutorial')}
              >
                <Text className="text-textLight text-2xl font-llewie">
                  Tutorial
                </Text>
              </TouchableOpacity>
            </View>

            {/* Friends */}
            <View className="mt-4 items-center">
              <TouchableOpacity
                className="bg-highlight rounded-lg w-full h-[4.5rem] my-4 items-center justify-center"
                onPress={() => navigation.navigate('MyFriends')}
              >
                <Text className="text-textLight text-2xl font-llewie">
                  My Friends
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View className="w-full  border-4 border-secondary rounded-2xl p-4 mt-2">
              <View>
                <Text className="text-white text-lg font-llewie text-center mt-2 ">
                  Hey AL_25
                </Text>
                <Text className="text-white text-lg font-llewie text-center mt-[-6px]">
                  Would you like to resume you game?
                </Text>
              </View>
              <View className="flex-row justify-around mt-3 px-4 gap-8 pb-7">
                <TouchableOpacity
                  className="bg-secondary rounded-lg w-[40%] h-12 items-center justify-center"
                  onPress={() => console.log('New Game')}
                >
                  <Text className="text-highlight text-xl font-llewie">
                    Yes!
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-secondary rounded-lg w-[40%] h-12 items-center justify-center"
                  onPress={() => console.log('Tutorial')}
                >
                  <Text className="text-highlight text-xl font-llewie">
                    No Thanks
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
