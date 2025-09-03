import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import FriendCard from '../../components/FriendCard';
import ArrowRight from '../../assets/icons/ArrowRight';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useUser } from '../../context/UserContext';
import { API_BASE_URL } from '@env';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type UserData = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  status: 'online' | 'offline';
  isOnline: boolean;
  globalRank?: number;
};

const MyFriendsScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [friendsData, setFriendsData] = useState<'My Friends' | 'Online'>(
    'My Friends',
  );
  const [searchId, setSearchId] = useState('');
  const FriendsOptions: ('My Friends' | 'Online')[] = ['My Friends', 'Online'];
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { user } = useUser();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = `${API_BASE_URL}/api/friends/list`;
      if (friendsData === 'Online') {
        endpoint = `${API_BASE_URL}/api/users?status=online&page=1&limit=50`;
      }

      if (searchId.trim() !== '') {
        endpoint = `${API_BASE_URL}/api/users/search?query=${searchId}&page=1&limit=20`;
      }

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Normalize response data
      const rawUsers = res.data.data?.users || res.data.data?.friends || [];

      // Filter out current user
      const filteredUsers = rawUsers.filter((u: any) => u.id !== user?.id);

      setUsers(filteredUsers);
      console.log(filteredUsers, endpoint);
    } catch (err: any) {
      console.log(err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const HandleRequest = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        `${API_BASE_URL}/api/friends/request`,
        { recipientId: userId }, // body
        {
          headers: { Authorization: `Bearer ${token}` }, // config
        },
      );

      console.log(res.data, 'friend request sended', userId);
      // fetchUsers();
    } catch (err: any) {
      console.log(err);
      setError('Failed to send friend request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [friendsData, searchId]);

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
            <View className="py-6 mb-10 flex items-center justify-center">
              <Text
                className="text-white font-llewie"
                style={{ fontSize: responsiveFontSize(4) }}
              >
                Players Pool
              </Text>
            </View>

            {/* Search */}
            <View
              className="absolute left-8 border-4 h-[4.5rem] w-full border-primary rounded-xl z-10 bg-white flex flex-row"
              style={{ bottom: -responsiveWidth(9) }}
            >
              <TextInput
                placeholder={
                  friendsData === 'My Friends'
                    ? 'Search for a friend to play'
                    : 'Search for a player available online'
                }
                placeholderTextColor="#2330665C"
                value={searchId}
                onChangeText={setSearchId}
                className="bg-textLight py-4 w-[85%] px-4 rounded-lg  font-llewie text-primary"
                style={{ fontSize: responsiveFontSize(1.5) }}
                onSubmitEditing={fetchUsers}
              />
              <TouchableOpacity
                className="bg-[#D9D9D9] flex justify-center items-center rounded-r-lg w-[15%]"
                onPress={fetchUsers}
              >
                <ArrowRight width={40} height={40} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Friends Section */}
          <View className="flex-1 py-8 px-4 bg-textLight">
            {/* Options */}
            <View className="mb-4 px-2">
              <View className="flex-row mt-8 justify-between bg-secondary">
                {FriendsOptions.map(option => {
                  const isSelected = friendsData === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setFriendsData(option)}
                      className={`flex-1 py-2 items-center ${
                        isSelected ? 'bg-highlight rounded-2xl' : 'bg-secondary'
                      }`}
                    >
                      <Text className="font-llewie text-2xl text-white">
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* List */}
            <View className="flex-1 -mb-10">
              {loading ? (
                <ActivityIndicator size="large" color="#000" />
              ) : error ? (
                <Text className="text-red-500 text-center">{error}</Text>
              ) : users.length === 0 ? (
                <View className="flex-1 justify-start mt-10 items-center">
                  <Text className="text-primary font-llewie">
                    No users found
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={users}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <FriendCard
                      Rank={item.globalRank || 0}
                      Id={item.id}
                      Online={item.isOnline}
                      Username={item.username}
                      image={
                        item.avatar ||
                        'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                      }
                      friendsData={friendsData}
                      handleRequest={HandleRequest}
                    />
                  )}
                  contentContainerStyle={{ padding: 10 }}
                  ItemSeparatorComponent={() => <View className="h-3" />}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MyFriendsScreen;
