import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../types/navigation';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
  

const characters = [
  {
    name: 'Hannah',
    image: require('../../assets/images/hannah.png'),
  },
  {
    name: 'Samuel',
    image: require('../../assets/images/samuel.png'),
  },
  {
    name: 'Dinah',
    image: require('../../assets/images/dinah.png'),
  },
  {
    name: 'Daniel',
    image: require('../../assets/images/daniel.png'),
  },
];

const CharacterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [selectedCharacter, setSelectedCharacter] = useState<null | {
    name: string;
    image: any;
  }>(null);

  const slideAnim = useRef(new Animated.Value(300)).current; // Off-screen initially

  const handleSelectCharacter = (character: { name: string; image: any }) => {
    setSelectedCharacter(character);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.navigate('GameIntroScreen');
        setSelectedCharacter(null)
      }, 2000);
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/bg_pattern_login.png')}
      resizeMode="cover"
      className="flex-1 bg-primary"
    >
      <SafeAreaView edges={['top']} className="flex-1 ">
        <View className="w-full">
          <View className="mb-0 items-center">
            <CustomHeader />
          </View>

          <View className="w-full h-full px-6 py-6 p-10">
            <Text className="font-llewie px-5 h-28 text-textLight text-5xl text-center">
              Let's choose your guide
            </Text>

            <View className="flex flex-row flex-wrap gap-6 justify-between mt-6">
              {characters.map(char => (
                <TouchableOpacity
                  key={char.name}
                  className="bg-highlight border-4 border-blueBorder rounded-3xl flex w-[47%] pt-3 h-[16rem] items-center"
                  onPress={() => handleSelectCharacter(char)}
                >
                  <Text className="text-white text-4xl font-llewie">
                    {char.name}
                  </Text>
                  <Image
                    source={char.image}
                    className="w-full flex-1"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Animated Slide-up Card */}
          {selectedCharacter && (
            <Animated.View
              style={{
                position: 'absolute',
                bottom: 210,
                left: 0,
                right: 0,
                transform: [{ translateY: slideAnim }],
              }}
              className="mx-4 z-10  rounded-3xl overflow-hidden border-[18px] border-highlight"
            >
              <LinearGradient
                colors={['#1C75BC', '#0D3656']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="w-full pt-10 items-center "
              >
                <Text className="text-white text-4xl font-llewie">
                  Hey I’m {selectedCharacter.name}!
                </Text>
                <Text className="text-white text-3xl mb-16 mt-1 font-llewie">
                  Let the games begin!
                </Text>
                <Image
                  source={selectedCharacter.image}
                  className="w-80 h-80  mt-4"
                  resizeMode="contain"
                />
              </LinearGradient>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CharacterScreen;
