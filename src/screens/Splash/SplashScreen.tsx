import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const firstImageOpacity = useRef(new Animated.Value(1)).current;
  const secondImageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(firstImageOpacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(secondImageOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.replace('Start');
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/first_img.png') as ImageSourcePropType}
        style={[styles.image, { opacity: firstImageOpacity }]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require('../../assets/images/second_img.png') as ImageSourcePropType}
        style={[styles.image, { position: 'absolute', opacity: secondImageOpacity }]}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#233066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
