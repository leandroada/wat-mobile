import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const HomeIcon = ({ color = '#fff', width = 32, height = 29, ...props }: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 29"
    fill="none"
    {...props}
  >
    <Path
      d="M16.276 1.191a1 1 0 0 0-1.2 0L2.351 10.735c-.753.565-.353 1.764.588 1.764a.98.98 0 0 1 .98.98v13.696a1 1 0 0 0 1 1h5.838a1 1 0 0 0 1-1v-5.838a1 1 0 0 1 1-1h5.838a1 1 0 0 1 1 1v5.838a1 1 0 0 0 1 1h5.838a1 1 0 0 0 1-1v-13.83c0-.527.437-.95.965-.935.913.027 1.32-1.137.59-1.685L16.276 1.191Z"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;
