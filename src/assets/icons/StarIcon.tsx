import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const StarIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 14 13"
    width={14}
    height={13}
    fill="#14AE5C"
    {...props}
  >
    <Path
      fill={props.fill}
      d="m2.884 13 1.083-4.683-3.634-3.15 4.8-.417L7 .333 8.867 4.75l4.8.417-3.633 3.15L11.117 13 7 10.517 2.884 13Z"
    />
  </Svg>
)
export default StarIcon
