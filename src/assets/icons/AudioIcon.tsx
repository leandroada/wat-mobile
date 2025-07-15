import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const AudioIcon = ({
  color = '#fff',
  width = 33,
  height = 23,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 33 23"
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.716 1.317a.5.5 0 0 1 .812.39v20.266a.501.501 0 0 1-.812.39l-7.102-5.68H1a.5.5 0 0 1-.5-.5V7.497a.5.5 0 0 1 .5-.5h5.614l7.102-5.68Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m31.399 7.498-8.685 8.685M22.714 7.498l8.685 8.685"
    />
  </Svg>
);

export default AudioIcon;
