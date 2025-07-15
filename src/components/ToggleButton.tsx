import React, { useState } from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';

type ToggleButtonProps = {
  initialValue?: boolean;
  onToggle?: (value: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ initialValue = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initialValue);
  const translateX = useState(new Animated.Value(initialValue ? 36 : 0))[0];

  const toggleSwitch = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onToggle?.(newValue);

    Animated.timing(translateX, {
      toValue: newValue ? 36 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      activeOpacity={0.8}
      className={`w-20 h-8 rounded-full  justify-center ${isOn ? 'bg-yellowOn' : 'bg-grayMuted'}`}
    >
      <Animated.View
        className="w-10 h-10 rounded-full bg-highlight"
        style={{ transform: [{ translateX }] }}
      />
    </TouchableOpacity>
  );
};

export default ToggleButton;
