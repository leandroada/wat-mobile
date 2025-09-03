import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { format } from 'date-fns';
import { responsiveWidth } from 'react-native-responsive-dimensions';

import CircleImage from '../../components/CircleImage';
import DeclineIcon from '../../assets/icons/DeclineIcon';
import AcceptIcon from '../../assets/icons/AcceptIcon';
import ResendIcon from '../../assets/icons/ResendIcon';
import PlayIcon from '../../assets/icons/PlayIcon';
import PlusIcon from '../../assets/icons/PlusIcon';

// ✅ Unified shape
type FriendRequest = {
  id: string;
  status: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
};

type gameRequests = {
  sent: FriendRequest[];
  received: FriendRequest[];
};

const GameNotification = () => {
  // ✅ Normalize data upfront
  const data: gameRequests = {
    sent: [
      {
        id: '660e8400-e29b-41d4-a716-4ert46655440002',
        status: 'PENDING',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440001',
          username: 'jane_doe',
          avatar: 'https://example.com/jane.jpg',
        },
        createdAt: '2024-01-15T10:30:00Z',
      },
    ],
    received: [
      {
        id: '660e8400-e29b-41d4-a716-4ert46655440003',
        status: 'PENDING',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440004',
          username: 'bob_smith',
          avatar: 'https://example.com/bob.jpg',
        },
        createdAt: '2024-01-15T09:15:00Z',
      },
      {
        id: '660e8400-e29b-41dr4-a716-446655440003',
        status: 'PENDING',
        user: {
          id: '550e8400-e29b-41d4-a716-446655440004',
          username: 'bob_smith',
          avatar: 'https://example.com/bob.jpg',
        },
        createdAt: '2024-01-15T09:15:00Z',
      },
    ],
  };

  const [gameRequests, setGameRequests] = useState<'sent' | 'received'>(
    'received',
  );

  return (
    <View className="bg-white flex-1">
      {/* Header */}
      <Text className="font-llewie px-4 text-primary text-2xl">
        {gameRequests === 'received'
          ? 'Game Requests Received'
          : 'Game Requests Sent'}
      </Text>

      {/* List */}
      <View className="h-[40%]">
        <FlatList
          data={data[gameRequests]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View className="flex-row  p-2 gap-2 ">
              {/* Avatar */}
              <View className="flex items-center">
                <CircleImage
                  image={
                    // item.user.avatar ||
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
                {gameRequests === 'received' ? (
                  <Text className="font-llewie text-[#0000009E] text-wrap">
                    you challenged{' '}
                    <Text className="font-llewie text-lg text-highlight">
                      {item.user.username}
                    </Text>{' '}
                    to a game.
                  </Text>
                ) : (
                  <Text className="font-llewie text-[#0000009E] text-wrap">
                    You missed a game request from{' '}
                    <Text className="font-llewie text-lg text-highlight">
                      {item.user.username}
                    </Text>{' '}
                    . Challenge back.
                  </Text>
                )}

                <Text className="text-[#0000007D] font-llewie">
                  {format(new Date(item.createdAt), 'M/d/yy')}
                </Text>
              </View>

              {/* Actions */}
              <View className="flex-row items-start  ">
                {gameRequests === 'received'? (
                  <View className="flex-row items-start  ">
                    <TouchableOpacity
                      onPress={() => console.log('resend', item.id)}
                      className="flex justify-center items-center mr-2"
                    >
                      <ResendIcon size={40} />
                      <Text className="font-llewie text-sm text-highlight">
                        Resend
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('Decline', item.id)}
                      className="flex justify-center items-center  mr-2 "
                    >
                      <DeclineIcon size={40} />
                      <Text className="font-llewie text-sm text-highlight">
                        Decline
                      </Text>
                    </TouchableOpacity>
                  </View>
                ):( <View className="flex-row space-x-4 gap-0">
                  <TouchableOpacity className="bg-primary h-[3rem] w-[3rem] flex justify-center items-center">
                    <PlayIcon width={12} height={12} />

                    <Text className="text-textLight text-xs mt-1 font-llewie">
                      Play
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-secondary h-[3rem] w-[3.5rem] flex justify-center items-center rounded-r-lg">
                    <PlusIcon width={12} height={12} />
                    <Text className="text-textLight text-[8px] mt-1 font-llewie">
                      Connect
                    </Text>
                  </TouchableOpacity>
                </View>)}
               
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 10 }}
          ItemSeparatorComponent={() => <View className="h-3" />}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 font-llewie mt-10">
              No {gameRequests} requests
            </Text>
          }
        />
      </View>

      {/* Toggle Button */}
      <View className="w-full px-4 h-full items-center ">
        <TouchableOpacity
          className="bg-highlight rounded-lg w-full h-16 items-center justify-center"
          onPress={() => {
            setGameRequests(gameRequests === 'sent' ? 'received' : 'sent');
          }}
        >
          <Text className="text-textLight p-4 text-2xl font-llewie text-center">
            {gameRequests === 'sent'
              ? 'View Requests Received '
              : 'View Requests Sent '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GameNotification;
