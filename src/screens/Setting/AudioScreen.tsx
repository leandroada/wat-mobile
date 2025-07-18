import React from 'react';
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import VolumeBar from '../../components/VolumeBar';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import ToggleButton from '../../components/ToggleButton';

const AudioScreen = () => {
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
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full">
            {/* Header */}
            <View className="mb-6 items-center">
              <CustomHeader />
            </View>

            {/* Audio Options */}
            <View className="w-full px-6 py-8 bg-textLight rounded-t-3xl">
              <Text
                className="font-llewie text-primary "
                style={{ fontSize: responsiveFontSize(5.5) }}
              >
                Audio
              </Text>

              <View className="flex gap-10 px-2 mt-6 h-full">
                {/* SFX Volume */}
                <View className="gap-4">
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    SFX Volume
                  </Text>
                  <VolumeBar
                    initialValue={0.3}
                    onVolumeChange={val => console.log('SFX Volume:', val)}
                  />
                </View>

                {/* Music Volume */}
                <View className="gap-4">
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    Music Volume
                  </Text>
                  <VolumeBar
                    initialValue={0.3}
                    onVolumeChange={val => console.log('Music Volume:', val)}
                  />
                </View>
                {/* Haptic Feedback */}
                <View className="flex gap-4">
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    Haptic Feedback
                  </Text>
                  <ToggleButton
                    initialValue={true}
                    onToggle={val => console.log('Toggle value:', val)}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AudioScreen;
