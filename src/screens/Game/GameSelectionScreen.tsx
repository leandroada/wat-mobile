import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import CustomHeader from '../../components/CustomHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const { height: screenHeight } = Dimensions.get('window');

type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const GameSelectionScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

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
        className={`font-llewie ${isSelected ? 'text-black' : 'text-white'}`}
        style={{ fontSize: responsiveFontSize(2.1) }}
      >
        {label}
      </Text>

      {isSelected && (
        <View className="w-5 h-5 bg-greenOn rounded-full absolute -top-2 -right-2 items-center justify-center overflow-visible">
          <Text
            className="text-white font-bold"
            style={{ fontSize: responsiveFontSize(1.5), marginTop: -2 }}
          >
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
        <View className="mb-6 items-center">
          <CustomHeader />
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(4),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex items-center  justify-start" style={{gap : responsiveHeight(1)}}>
            <Text
              className="text-white  font-llewie"
              style={{ fontSize: responsiveFontSize(4) }}
            >
              Choose your Game
            </Text>

            {/* Difficulty */}
            <View className="border-4 border-secondary rounded-xl p-4 mt-4 pb-6 w-full">
              <Text
                className="text-white font-llewie"
                style={{ fontSize: responsiveFontSize(2.6) }}
              >
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
              <Text
                className="text-white font-llewie"
                style={{ fontSize: responsiveFontSize(2.6) }}
              >
                Testament
              </Text>
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
              <Text
                className="text-white font-llewie"
                style={{ fontSize: responsiveFontSize(2.6) }}
              >
                Opponent
              </Text>
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
                className="bg-secondary rounded-lg w-full items-center justify-center my-4"
                style={{
                  height: responsiveHeight(screenHeight > 700 ? 6.5 : 7.2),
                }}
              >
                <Text
                  className="text-primary font-llewie"
                  style={{ fontSize: responsiveFontSize(3) }}
                >
                  Start Game
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default GameSelectionScreen;
