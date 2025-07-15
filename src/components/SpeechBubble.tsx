import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

interface SpeechBubbleProps {
  message: string;
  svgWidth?: number;
  svgHeight?: number;
  triangleOffsetX?: number; // triangle horizontal position control
  textTopOffset?: number; // move text up/down
  fontSize?: number;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  message,
  svgWidth = 272,
  svgHeight = 382,
  triangleOffsetX = 95,
  textTopOffset = 40,
  fontSize = 20,
}) => {
  const bubblePath = `M4 20C4 8.954 12.954 0 24 0h${
    svgWidth - 48
  }c11.046 0 20 8.954 20 20v${
    svgHeight - 76
  }c0 11.046-8.954 20-20 20H24c-11.046 0-20-8.954-20-20V20Z`;

  const trianglePath = `M${triangleOffsetX} ${
    svgHeight + 2
  }c9.2-5.2 13.833-30.833 15-43h27.5c-4 19.6-30 36.833-42.5 43Z`;

  return (
    <View style={[styles.wrapper, { width: svgWidth, height: svgHeight }]}>
      {/* SVG Bubble */}
      <Svg width={svgWidth} height={svgHeight} fill="none">
        <G fill="#1C75BC">
          <Path d={bubblePath} />
          <Path d={trianglePath} />
        </G>
      </Svg>

      {/* Text overlay */}
      <View
        style={[
          styles.textContainer,
          {
            top: textTopOffset,
            paddingHorizontal: svgWidth * 0.1,
          },
        ]}
      >
        <Text className={"font-llewie text-white  text-5xl text-center"}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default SpeechBubble;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    width: '100%',
  },
  messageText: {
    color: 'white',
    // fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'llewie',
  },
});
