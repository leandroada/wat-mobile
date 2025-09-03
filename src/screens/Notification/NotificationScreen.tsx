import React, { useState } from 'react';
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
import FriendNotification from './FriendNotification';
import GameNotification from './GameNotification';

const NotificationScreen = () => {
  const FriendsOptions: ('Friend' | 'Game' | 'System')[] = [
    'Friend',
    'Game',
    'System',
  ];
  const [NotificationData, setNotificationData] = useState<
    'Friend' | 'Game' | 'System'
  >('Friend');
  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="w-full ">
          {/* Logo */}
          <View className="mb-6 items-center">
            <CustomHeader />
          </View>
          {/* Notification title*/}
          <View className="flex justify-center items-center mb-10 mt-4">
            <Text className="text-white text-5xl font-llewie ">
              Notifications
            </Text>
          </View>

          {/* Notification */}
          <View className=" h-full pb-8 px-4 bg-textLight">
            {/* Options */}
            <View className="mb-4 px-2 ">
              <View className="flex-row mt-8 justify-between bg-[#DADADA] rounded-xl">
                {FriendsOptions.map(option => {
                  const isSelected = NotificationData === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setNotificationData(option)}
                      className={`flex-1 py-2 items-center 
    ${isSelected ? 'bg-white rounded-2xl' : 'grayMuted'}
    ${option === 'System' && !isSelected ? 'border-l-2 border-gray-400' : ''}
    ${option === 'Friend' && !isSelected ? 'border-r-2 border-gray-400' : ''}
    ${option === 'Game' && isSelected ? 'border-0' : ''}
  `}
                      style={
                        isSelected
                          ? {
                              shadowColor: '#000',
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              elevation: 5, // <-- Android
                            }
                          : {}
                      }
                    >
                      <Text
                        className={`font-llewie text-2xl ${
                          isSelected ? 'text-highlight' : 'text-primary'
                        }`}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            {/*  Notification section */}
            {NotificationData === 'Friend' && <FriendNotification />}
            {NotificationData === 'Game' && <GameNotification />}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NotificationScreen;
