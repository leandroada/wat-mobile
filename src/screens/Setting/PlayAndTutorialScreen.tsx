import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { Image } from 'react-native';

const PlayAndTutorialScreen = () => {
  return (
    <View className="flex-1 bg-primary -z-10">
      {/* Top 20% Background Dots */}
      <View
        style={{
          position: 'absolute',
          top: 10,
          width: '100%',
          height: responsiveHeight(20),
          zIndex: -1,
        }}
      >
        <Image
          source={require('../../assets/images/bg-pattern-large.png')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            transform: [{ scale: 1.2 }],
          }}
        />
      </View>
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View className="w-full">
            {/* Header */}
            <View className="mb-6 items-center">
              <CustomHeader />
            </View>

            {/* Options */}
            <View className="w-full px-6 py-8 bg-textLight rounded-t-3xl" style={{height: responsiveHeight(100)}}>
              <Text
                className="font-llewie text-primary"
                style={{ fontSize: responsiveFontSize(5) }}
              >
                How to Play & Tutorial
              </Text>

              <View className="flex gap-1 px-2 mt-10">
                {['Puzzle Instructions ', 'Puzzle Tutorial', 'Advance Tips & Scoring','Daily Challenge Instructions'].map(
                  (label, index) => (
                    <View key={index}>
                      <Text
                        className="font-llewie text-primary"
                        style={{ fontSize: responsiveFontSize(3.5) }}
                      >
                        {label}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PlayAndTutorialScreen;
