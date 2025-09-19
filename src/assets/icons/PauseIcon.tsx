import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const PauseIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 19 19"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#233066"
      d="M0 0v18.531h6.177V0H0Zm12.354 0v18.531h6.177V0h-6.177Z"
    />
  </Svg>
)
export default PauseIcon
