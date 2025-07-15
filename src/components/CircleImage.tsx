import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface CircleImageProps {
  image: string; // URL or local image path
  size?: number; // optional, default 60
}

const CircleImage: React.FC<CircleImageProps> = ({ image, size = 60 }) => {
  return (
    <Image
      source={{ uri: image }}
      style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
});

export default CircleImage;
