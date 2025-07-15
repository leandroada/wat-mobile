import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../components/Logo';
import CircleImage from '../../components/CircleImage';
import CustomHeader from '../../components/CustomHeader';
import { RootStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ArrowRight from '../../assets/icons/ArrowRight';
import FriendCard from '../../components/FriendCard';
import CrownIcon from '../../assets/icons/CrownIcon';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MyFriendsScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [friendsData, setFriendsData] = useState<'My Friends' | 'Online'>('My Friends');
  const [searchId, setSearchId] = useState('');
  const FriendsOptions: ('My Friends' | 'Online')[] = ['My Friends', 'Online'];

  const friendData = [
    { Rank: 101, Id: 'AL_01', Online: true, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { Rank: 204, Id: 'BZ_42', Online: false, image: 'https://randomuser.me/api/portraits/women/5.jpg' },
    { Rank: 325, Id: 'CT_88', Online: true, image: 'https://randomuser.me/api/portraits/men/8.jpg' },
    { Rank: 112, Id: 'DK_23', Online: false, image: 'https://randomuser.me/api/portraits/women/9.jpg' },
    { Rank: 430, Id: 'EZ_77', Online: true, image: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { Rank: 157, Id: 'FG_19', Online: true, image: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { Rank: 198, Id: 'HY_66', Online: false, image: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { Rank: 263, Id: 'JK_35', Online: true, image: 'https://randomuser.me/api/portraits/women/18.jpg' },
    { Rank: 341, Id: 'LM_04', Online: false, image: 'https://randomuser.me/api/portraits/men/20.jpg' },
    { Rank: 390, Id: 'NO_90', Online: true, image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  ];

  const filteredFriends = friendData.filter(friend => {
    if (searchId.trim() !== '') {
      return friend.Id.toLowerCase().includes(searchId.toLowerCase());
    } else if (friendsData === 'Online') {
      return friend.Online;
    }
    return true;
  });

  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="flex-1">
          {/* Header */}
          <View className="mb-4 items-center">
            <CustomHeader />
          </View>

          {/* User Card */}
          <View className="px-8 relative py-4 mb-2">
            <View className="flex flex-row justify-between pb-10 items-center">
              <View className="flex flex-row items-center gap-2">
                <CircleImage image="https://randomuser.me/api/portraits/men/32.jpg" size={70} />
                <View>
                  <Text className="text-white text-2xl font-llewie">RANK #234</Text>
                  <Text className="text-white text-4xl font-llewie">AL_25</Text>
                </View>
              </View>
              <View className="items-center">
                <Text className="text-white text-md font-llewie pb-2" style={{ letterSpacing: 5 }}>
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

            {/* Search */}
            <View className="absolute top-32 left-8 border-4 w-full border-primary rounded-xl z-10 bg-white flex flex-row">
              <TextInput
                placeholder="Search For Friends"
                placeholderTextColor="#2330665C"
                value={searchId}
                onChangeText={setSearchId}
                className="bg-textLight py-4 w-[85%] px-4 rounded-lg text-lg font-llewie text-primary"
              />
              <TouchableOpacity
                className="bg-[#D9D9D9] flex justify-center items-center rounded-r-lg w-[15%]"
                onPress={() => {}}
              >
                <ArrowRight width={40} height={40} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Friends Section */}
          <View className="flex-1 py-8 px-4 bg-textLight">
            {/* Options */}
            <View className="mb-4 px-2">
              <View className="flex-row mt-8 justify-between">
                {FriendsOptions.map(option => {
                  const isSelected = friendsData === option;
                  const isFirst = option === 'My Friends';
                  const isLast = option === 'Online';

                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setFriendsData(option)}
                      className={[
                        'flex-1 py-2 items-center',
                        isSelected ? 'bg-highlight' : 'bg-secondary',
                        isFirst ? 'rounded-l-lg' : '',
                        isLast ? 'rounded-r-lg' : '',
                      ].join(' ')}
                    >
                      <Text className="font-llewie text-2xl text-white">{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Friend List */}
            <View className="flex-1">
              <FlatList
                data={filteredFriends}
                keyExtractor={(item, index) => item.Id + index}
                renderItem={({ item }) => (
                  <FriendCard
                    Rank={item.Rank}
                    Id={item.Id}
                    Online={item.Online}
                    image={item.image}
                    friendsData={friendsData}
                  />
                )}
                contentContainerStyle={{ padding: 10 }}
                ItemSeparatorComponent={() => <View className="h-3" />}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MyFriendsScreen;
