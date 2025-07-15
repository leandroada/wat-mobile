import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ArrowRight = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 30"
    fill="none"
    {...props} // this will allow width, height, color, etc. to be passed
  >
    <Path
      d="M5.613 29.935 20.58 14.967 5.613 0 0 5.613l9.354 9.354L0 24.322l5.613 5.613Z"
      fill={props.color || "#233066"} // fallback color
    />
  </Svg>
);

export default ArrowRight;
