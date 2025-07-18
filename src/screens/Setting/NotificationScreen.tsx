import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import ToggleButton from '../../components/ToggleButton';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const NotificationScreen = () => {
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
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full">
            {/* Header */}
            <View className="mb-6 items-center">
              <CustomHeader />
            </View>

            {/* Body */}
            <View className="w-full px-6 py-8 bg-textLight rounded-t-3xl">
              <Text
                className="font-llewie text-primary mt-2"
                style={{ fontSize: responsiveFontSize(5) }}
              >
                Notifications
              </Text>

              <View className="flex gap-10 px-2 mt-9 h-full">
                {/* Daily Challenge */}
                <View className="flex gap-4">
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    Daily challenge reminders
                  </Text>
                  <ToggleButton
                    initialValue={true}
                    onToggle={(val) => console.log('Toggle value:', val)}
                  />
                </View>

                {/* Friend Invites */}
                <View className="flex gap-4">
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    Friend Invite Alerts
                  </Text>
                  <ToggleButton
                    initialValue={true}
                    onToggle={(val) => console.log('Toggle value:', val)}
                  />
                </View>

                {/* Level-Up Alerts */}
                <View className="flex gap-4">
                  <Text
                    className="font-llewie text-primary"
                    style={{ fontSize: responsiveFontSize(3.5) }}
                  >
                    Level-Up & Achievement Alerts
                  </Text>
                  <ToggleButton
                    initialValue={true}
                    onToggle={(val) => console.log('Toggle value:', val)}
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

export default NotificationScreen;
