import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const PlusIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 15 15"
    fill="none"
    {...props} // allows width, height, color, etc.
  >
    <Path
      d="M5.625 0v5.625H0v3.75h5.625V15h3.75V9.375H15v-3.75H9.375V0h-3.75Z"
      fill={props.color || "#fff"} // use passed color or default to white
    />
  </Svg>
);

export default PlusIcon;
