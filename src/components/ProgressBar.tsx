import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height = 10 }) => {
  return (
    <View style={[styles.container, { height }]}>
      <LinearGradient
        colors={['#D9D9D9', '#1C75BC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progress, { width: `${progress * 100}%`, height }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e5e5e5',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 999,
  },
});

export default ProgressBar;
