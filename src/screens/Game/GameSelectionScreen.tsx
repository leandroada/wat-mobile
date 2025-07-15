import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import CustomHeader from '../../components/CustomHeader';

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const GameSelectionScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'Beginner' | 'Advanced' | null
  >(null);

  const [selectedTestament, setSelectedTestament] = useState<
    'New Testament' | 'Old Testament' | null
  >(null);

  const [selectedOpponent, setSelectedOpponent] = useState<
    'Computer' | 'Play Online' | null
  >(null);

  const handleStartGame = () => {
    console.log({
      difficulty: selectedDifficulty,
      testament: selectedTestament,
      opponent: selectedOpponent,
    });

    // You can navigate with selections here:
    navigation.navigate('CharacterScreen');
  };

  const renderOption = (
    label: string,
    isSelected: boolean,
    onPress: () => void,
  ) => (
    <TouchableOpacity
      onPress={onPress}
      className={`border-2 border-secondary relative px-3 py-4 flex justify-center items-center rounded-lg w-[48%] ${
        isSelected ? 'bg-secondary' : ''
      }`}
    >
      <Text
        className={`text-xl font-llewie ${
          isSelected ? 'text-black' : 'text-white'
        }`}
      >
        {label}
      </Text>

      {isSelected && (
        <View className="w-5 h-5 bg-greenOn rounded-full absolute -top-2 -right-2 items-center justify-center overflow-visible">
          <Text className="text-white text-xl leading-none ml-1 -mt-[5px]">
            ✓
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/bg_gameSelection.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1">
        <View className="w-full">
          <View className="mb-6 items-center">
            <CustomHeader />
          </View>

          <View className="h-full flex items-center gap-4 justify-start px-5">
            <Text className="text-white text-4xl font-llewie">
              Choose your Game
            </Text>

            {/* Difficulty */}
            <View className="border-4 border-secondary rounded-xl p-4 mt-4 pb-6 w-full">
              <Text className="text-white text-2xl font-llewie">
                Difficulty
              </Text>
              <View className="flex flex-row justify-between mt-3">
                {renderOption(
                  'Beginner',
                  selectedDifficulty === 'Beginner',
                  () => setSelectedDifficulty('Beginner'),
                )}
                {renderOption(
                  'Advanced',
                  selectedDifficulty === 'Advanced',
                  () => setSelectedDifficulty('Advanced'),
                )}
              </View>
            </View>

            {/* Testament */}
            <View className="border-4 border-secondary rounded-xl p-4 mt-4 pb-6 w-full">
              <Text className="text-white text-2xl font-llewie">Testament</Text>
              <View className="flex flex-row justify-between mt-3">
                {renderOption(
                  'New Testament',
                  selectedTestament === 'New Testament',
                  () => setSelectedTestament('New Testament'),
                )}
                {renderOption(
                  'Old Testament',
                  selectedTestament === 'Old Testament',
                  () => setSelectedTestament('Old Testament'),
                )}
              </View>
            </View>

            {/* Opponent */}
            <View className="border-4 border-secondary rounded-xl p-4 mt-4 pb-6 w-full">
              <Text className="text-white text-2xl font-llewie">Opponent</Text>
              <View className="flex flex-row justify-between mt-3">
                {renderOption('Computer', selectedOpponent === 'Computer', () =>
                  setSelectedOpponent('Computer'),
                )}
                {renderOption(
                  'Play Online',
                  selectedOpponent === 'Play Online',
                  () => setSelectedOpponent('Play Online'),
                )}
              </View>
            </View>

            {/* Start Game */}
            <View className="mt-4 items-center w-full">
              <TouchableOpacity
                onPress={handleStartGame}
                className="bg-secondary rounded-lg w-full h-[4.5rem] my-4 items-center justify-center"
              >
                <Text className="text-primary text-3xl font-llewie">
                  Start Game
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GameSelectionScreen;
