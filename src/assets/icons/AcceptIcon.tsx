import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function AcceptIcon({ size = 27, bgColor = "#C4CEC6", strokeColor = "#00D532", ...props }) {
  return (
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
        d="M9 14.068L11.952 17 19 10"
        stroke={strokeColor}
        strokeOpacity={0.89}
        strokeWidth={3}
      />
    </Svg>
  );
}

export default AcceptIcon;
