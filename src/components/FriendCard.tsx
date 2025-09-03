import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CircleImage from './CircleImage';
import PlusIcon from '../assets/icons/PlusIcon';
import PlayIcon from '../assets/icons/PlayIcon';

type FriendCardProps = {
  Rank?: number;
  Id?: string; // userId (string from API)
  Username?: string;
  Online?: boolean;
  image?: string;
  friendsData?: string; // optional legacy prop
  handleRequest?: (userId: string) => void;
};

const FriendCard = ({
  Rank = 234,
  Username = 'AL_25',
  Online = false,
  Id,
  image,
  friendsData,
  handleRequest,
}: FriendCardProps) => {
  return (
    <View className="bg-highlight h-[4.5rem] rounded-lg w-full flex-row items-center justify-between gap-2 pl-2">
      {/* Left Side: Status + Avatar + Info */}
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
          <Text className="text-white text-xl font-llewie">{Username}</Text>
        </View>
      </View>

      {/* Right Side: Buttons */}
      {Online ? (
        <View className="flex-row">
          {/* Play Button */}
          <TouchableOpacity className="bg-primary h-[4.5rem] w-[5rem] flex justify-center items-center"
          // onPress={() => Id && handleRequest?.(Id)} 
          >
            <PlayIcon width={20} height={20} />
            <Text className="text-textLight text-xs mt-1 font-llewie">
              Play
            </Text>
          </TouchableOpacity>

          {/* Connect Button */}
          <TouchableOpacity
            className="bg-secondary h-[4.5rem] w-[4.5rem] flex justify-center items-center rounded-r-lg"
            onPress={() => Id && handleRequest?.(Id)} // ✅ Safe call only if Id exists
          >
            <PlusIcon width={20} height={20} />
            <Text className="text-textLight text-xs mt-1 font-llewie">
              Connect
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row">
          <TouchableOpacity className="bg-primary h-[4.5rem] w-[5rem] flex justify-center items-center rounded-r-lg" >
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
