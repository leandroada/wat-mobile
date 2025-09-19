import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface GameIconProps extends SvgProps {
  pieces?: number // 0 - 12
}

const JAR_PIECES = [
  // These are the 12 "pieces" (subpaths) you want to toggle individually
  "M14.5 62 7.218 51.641l3.385-9.167L23.718 55.5 14.5 62Z",
  "M18.218 23.859l-5.923 16.077 14.667-13.115-8.744-2.962Z",
  "M13.988 41.628 28.09 29.5l-5.782 20.872-8.32-8.744Z",
  "M37.68 19.064l-15.936 2.398L42.616 29.5 37.68 19.064Z",
  "M53.334 56.436l-9.59-23.974-5.077 7.474 14.667 16.5Z",
  "M31.898 63.91l-10.154 7.334 1.974 1.833h15.654l3.526-4.09-11-5.077Z",
  "M29.641 36.692l1.27-8.602 9.871 3.243-4.794 6.91-6.347-1.55Z",
  "M51.782 58.692l-11-13.397 3.667 22.141 7.333-8.744Z",
  "M7.218 12.436l11 7.474 7.334-11-18.334 3.526Z",
  "M28.936 8.628l-7.192 10.154 14.808-2.68V6.796l-7.616 1.833Z",
  "M38.667 6.795l6.77-1.551-6.77 10.859V6.795Z",
  "M24.5 57l-9 6.5 5 6.5 10-7.5-6-5.5Z",
]

const GameIcon: React.FC<GameIconProps> = ({ pieces = 12, ...props }) => {
  return (
    <Svg viewBox="0 0 59 77" width={59} height={77} fill="none" {...props}>
      {/* Outer jar shape */}
      <Path
        fill="#fff"
        stroke="#CD7D9B"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M50.18 1.019a1 1 0 0 1 1.054 1.487l-9.336 15.923L57.92 56.044a1 1 0 0 1-.148 1.027l-15.09 18.333c-.19.231-.473.365-.772.365H20.757c-.325 0-.631-.158-.819-.424L4.145 52.922a1 1 0 0 1-.125-.91l10.476-29.638L1.39 12.24a1.001 1.001 0 0 1 .42-1.773l48.37-9.448Z"
      />

      {/* Dynamic pieces — show only as many as passed in props */}
      {JAR_PIECES.slice(0, pieces).map((d, index) => (
        <Path key={index} fill="#1C75BC" d={d} />
      ))}

      {/* (Optional) You can still keep the dark overlay piece if needed */}
      <Path
        fill="#3A3E62"
        d="m38.747 45.901-.732-1.573a.623.623 0 0 0-.828-.303l-3.257 1.51a.624.624 0 0 1-.866-.409l-1.083-4.16a.624.624 0 0 0-.76-.446l-1.552.402a.622.622 0 0 0-.447.76l1.271 4.88a.62.62 0 0 1-.341.72l-3.957 1.834a.62.62 0 0 0-.303.826l.732 1.574a.623.623 0 0 0 .828.302l3.257-1.509a.624.624 0 0 1 .866.408l3.094 11.88a.624.624 0 0 0 .76.447l1.552-.402a.623.623 0 0 0 .447-.76l-3.28-12.6a.62.62 0 0 1 .34-.721l3.958-1.833a.62.62 0 0 0 .303-.827h-.002Z"
      />
    </Svg>
  )
}

export default GameIcon
