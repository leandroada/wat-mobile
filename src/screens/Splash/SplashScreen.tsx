import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LogoStart from '../../components/LogoStart';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  // Animated values
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in entire screen
    Animated.timing(screenOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      // Fade out logo
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 800,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        // Fade in text and image together
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(imageOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Navigate after delay
          setTimeout(() => {
            navigation.navigate('Start'); 
          }, 2000);
        });
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      <ImageBackground
        source={require('../../assets/images/bg_startScreen.png')}
        resizeMode="contain"
        className="flex-1 bg-primary"
      >
        <SafeAreaView className="flex-1 justify-center items-center">
          {/* Container for both elements */}
          <View style={styles.centerContent}>
            {/* Logo */}
            <Animated.View style={[styles.logoWrapper, { opacity: logoOpacity }]}>
              <LogoStart width={responsiveWidth(80)} height={responsiveHeight(10)} />
            </Animated.View>

            {/* Tagline  */}
            <Animated.View style={[styles.textWrapper, { opacity: textOpacity }]}>
              <Text className="font-llewie text-textLight text-center text-3xl">
                {"Get to know scripture.\nOne puzzle at a time."}
              </Text>
            </Animated.View>
          </View>

          {/* Bottom image */}
          <Animated.Image
            source={require('../../assets/images/character_img.png')}
            resizeMode="cover"
            style={[
              styles.bottomImage,
              { opacity: imageOpacity },
            ]}
          />
        </SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#233066',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: responsiveHeight(25),
  },
  logoWrapper: {
    position: 'absolute',
    top: responsiveHeight(5), 
  },
  textWrapper: {
    position: 'absolute',
    top: 0, 
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    width: responsiveWidth(100),
    height: responsiveWidth(100),
  },
});
