import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { format } from 'date-fns';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';

import CircleImage from '../../components/CircleImage';
import DeclineIcon from '../../assets/icons/DeclineIcon';
import AcceptIcon from '../../assets/icons/AcceptIcon';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '@env';

// Match API response
type FriendRequest = {
  friendshipId: string;
  user: {
    id: string;
    username: string;
    avatar?: string | null;
  };
  createdAt: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
};

type FriendRequests = {
  sent: FriendRequest[];
  received: FriendRequest[];
};

const FriendNotification = () => {
  const [friendRequests, setFriendRequests] = useState<'sent' | 'received'>('received');
  const [requests, setRequests] = useState<FriendRequests>({ sent: [], received: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  // Fetch friend requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_BASE_URL}/api/friends/requests?limit=20&offset=0`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API response:", res.data);

      setRequests(res.data.data || { sent: [], received: [] });
    } catch (err) {
      console.log(err);
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [friendRequests]);

  // Manage friendship (accept / decline / remove)
  const manageFriendship = async (
    friendshipId: string,
    action: 'accept' | 'decline' | 'remove'
  ) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/friends/${friendshipId}`,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  // Render each request
  const renderItem = ({ item }: { item: FriendRequest }) => {
    return (
      <View className="flex-row p-2 gap-2 relative bg-slate-200 rounded-lg">
        {/* Avatar + Rank */}
        <View className="flex items-center">
          <CircleImage
            image={
              item.user.avatar ||
              'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
            }
            size={responsiveWidth(10)}
          />
          <View>
            <Text className="font-llewie text-sm text-black">Rank:</Text>
            <Text className="font-llewie text-sm text-black">#234</Text>
          </View>
        </View>

        {/* Info */}
        <View className="flex items-start w-60">
          {friendRequests === 'received' ? (
            <Text className="font-llewie text-[#0000009E]">
              <Text className="font-llewie text-lg text-highlight">{item.user.username}</Text>{' '}
              sent you a connect request
            </Text>
          ) : (
            <Text className="font-llewie text-[#0000009E]">
              You requested to join{' '}
              <Text className="font-llewie text-lg text-highlight">{item.user.username}</Text>{' '}
              friend circle.
            </Text>
          )}
          {item.createdAt && (
            <Text className="text-[#0000007D] font-llewie">
              {format(new Date(item.createdAt), 'M/d/yy')}
            </Text>
          )}
        </View>

        {/* Actions */}
        <View className="flex-row items-start justify-center h-full pt-1 absolute right-0">
          {friendRequests === 'received' ? (
            <>
              <TouchableOpacity
                onPress={() => manageFriendship(item.friendshipId, 'accept')}
                className="flex justify-center items-center mr-2"
              >
                <AcceptIcon size={40} />
                <Text className="font-llewie text-xs text-highlight">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => manageFriendship(item.friendshipId, 'decline')}
                className="flex justify-center items-center mr-2"
              >
                <DeclineIcon size={40} />
                <Text className="font-llewie text-xs text-highlight">Decline</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => manageFriendship(item.friendshipId, 'remove')}
              className="flex justify-center items-center mr-2"
            >
              <DeclineIcon size={40} />
              <Text className="font-llewie text-xs text-highlight">Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="bg-white flex-1">
      {/* Header */}
      <Text className="font-llewie px-4 text-primary text-2xl">
        {friendRequests === 'received'
          ? 'Connect Requests Received'
          : 'Connect Requests Sent'}
      </Text>

      {/* List */}
      <View className="h-[40%]">
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={requests[friendRequests]}
            keyExtractor={(item) => item.friendshipId}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
            ItemSeparatorComponent={() => <View className="h-3" />}
            ListEmptyComponent={
              <Text className="text-center text-gray-500 font-llewie mt-10">
                No {friendRequests} requests
              </Text>
            }
          />
        )}
      </View>

      {/* Toggle Button */}
      <View className="w-full px-4 h-full items-center ">
        <TouchableOpacity
          className="bg-highlight  rounded-lg w-full h-16 items-center justify-center"
          onPress={() =>
            setFriendRequests(friendRequests === 'sent' ? 'received' : 'sent')
          }
        >
          <Text className="text-textLight text-2xl font-llewie text-center">
            {friendRequests === 'sent'
              ? 'View Requests Received'
              : 'View Requests Sent'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FriendNotification;
