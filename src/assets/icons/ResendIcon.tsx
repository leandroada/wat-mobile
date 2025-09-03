import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

type ResendIconProps = SvgProps & {
  size?: number;
  color?: string;
};

const ResendIcon = ({ size = 27, color = "#233066", ...props }: ResendIconProps) => {
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
        fill="#C4CEC6"
        fillOpacity={0.89}
      />
      <Path
        d="M21.923 6.177l-5.166 14.968c-.146.422-.753.484-.99.099l-3.474-5.657a.493.493 0 01.033-.567l1.248-1.59-1.68 1.181a.57.57 0 01-.6.032l-5.974-3.29a.506.506 0 01.104-.936l15.812-4.89c.422-.131.826.248.687.65z"
        fill={color}
        fillOpacity={0.58}
      />
    </Svg>
  );
};

export default ResendIcon;
