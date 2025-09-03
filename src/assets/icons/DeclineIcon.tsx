import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  size?: number;   // custom size
  color?: string;  // custom fill color for the X
  bgColor?: string; // custom background color
}

const DeclineIcon = ({ size = 27, color = "#F20000", bgColor = "#C4CEC6", ...props }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 27 27"
    fill="none"
    {...props}
  >
    <Rect
      width={27}
      height={27}
      rx={13.5}
      fill={bgColor}
      fillOpacity={0.89}
    />
    <Path
      d="M16.877 18.899l-3.24-3.24-3.239 3.24-2.159-2.16 3.24-3.239-3.24-3.239 2.16-2.16 3.239 3.24 3.239-3.24 2.16 2.16-3.24 3.24 3.24 3.238-2.16 2.16z"
      fill={color}
    />
  </Svg>
);

export default DeclineIcon;
