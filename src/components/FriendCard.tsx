import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CircleImage from './CircleImage';
import PlusIcon from '../assets/icons/PlusIcon';
import PlayIcon from '../assets/icons/PlayIcon';

type FriendCardProps = {
  Rank?: number;
  Id?: string;
  Online?: boolean;
  image?: string;
  friendsData?: string;
};

const FriendCard = ({
  Rank = 234,
  Id = 'AL_25',
  Online = false,
  image,
  friendsData,
}: FriendCardProps) => {
  return (
    <View className="bg-highlight h-[4.5rem] rounded-lg w-full flex-row items-center justify-between gap-2 pl-2 ">
      <View className="flex flex-row items-center gap-2">
        <View
          className={`w-4 h-4 rounded-full ${
            Online ? 'bg-greenOnline' : 'bg-redOffline'
          }`}
        />

        <CircleImage
          image={image || 'https://randomuser.me/api/portraits/men/32.jpg'}
          size={40}
        />

        <View>
          <Text className="text-white text-xl -mb-2 font-llewie">
            RANK #{Rank}
          </Text>
          <Text className="text-white text-xl font-llewie">{Id}</Text>
        </View>
      </View>

      {friendsData == 'Online' ? (
        <View className="flex-row space-x-4">
          <TouchableOpacity className="bg-primary h-[4.5rem] w-[4.5rem] flex justify-center items-center">
            <PlayIcon width={20} height={20} />

            <Text className="text-textLight text-xs mt-1 font-llewie">
              Play
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-secondary h-[4.5rem] w-[4.5rem] flex justify-center items-center rounded-r-lg">
            <PlusIcon width={20} height={20} />
            <Text className="text-textLight text-xs mt-1 font-llewie">
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row space-x-4">
          <TouchableOpacity className="bg-primary h-[4.5rem] w-[4.5rem] flex justify-center items-center rounded-r-lg">
            <PlayIcon width={20} height={20} />

            <Text className="text-textLight text-xs mt-1 font-llewie">
              Play
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FriendCard;
