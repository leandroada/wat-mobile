import React, { useRef } from 'react';
import { View, PanResponder, Animated } from 'react-native';

type VolumeBarProps = {
  initialValue?: number;
  onVolumeChange?: (value: number) => void;
};

const VolumeBar: React.FC<VolumeBarProps> = ({
  initialValue = 0.5,
  onVolumeChange,
}) => {
  const barWidth = 350;
  const barHeight = 20;
  const ballSize = 36;

  const translateX = useRef(
    new Animated.Value(initialValue * (barWidth - ballSize))
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        let newX = gestureState.dx + initialValue * (barWidth - ballSize);
        newX = Math.max(0, Math.min(newX, barWidth - ballSize));
        translateX.setValue(newX);

        const volume = newX / (barWidth - ballSize);
        onVolumeChange?.(volume);
      },
    })
  ).current;

  const animatedFillWidth = Animated.add(translateX, new Animated.Value(ballSize / 2));

  return (
    <View className="w-full items-center justify-center py-6 ">
      {/* Background bar (gray) */}
      <View
        className="bg-grayMuted rounded-full "
        style={{ width: barWidth, height: barHeight }}
      >
        {/* Filled yellow bar */}
        <Animated.View
          className="bg-yellowOn absolute rounded-full left-0 top-0 bottom-0"
          style={{ width: animatedFillWidth }}
        />

        {/* Ball */}
        <Animated.View
          {...panResponder.panHandlers}
          className="bg-highlight rounded-full absolute"
          style={{
            width: ballSize,
            height: ballSize,
            transform: [{ translateX }],
            top: (barHeight - ballSize) / 2,
          }}
        />
      </View>
    </View>
  );
};

export default VolumeBar;
