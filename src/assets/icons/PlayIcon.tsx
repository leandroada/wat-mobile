import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const PlayIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 12 16"
    fill="none"
    {...props} // width, height, color can be passed from outside
  >
    <Path
      d="M0 16V0l12 8.686L0 16Z"
      fill={props.color || "#fff"} // use props.color or default to white
    />
  </Svg>
);

export default PlayIcon;
