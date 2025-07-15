import * as React from "react";
import Svg, {
  SvgProps,
  G,
  ForeignObject,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg";

const CrownIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 17"
    fill="none"
    {...props} // makes width/height customizable
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)" data-figma-skip-parse="true">
        <ForeignObject
          width={2240.53}
          height={2240.53}
          x={-1120.26}
          y={-1120.26}
          transform="matrix(0 .00832 -.01123 0 12.105 8.641)"
        />
      </G>
      <Path
        d="M23.254 4.62a.39.39 0 0 1 .076.23c-.003.399-.198 1.19-.269 1.631-.55 3.422-1.164 6.834-1.706 10.256a.301.301 0 0 1-.297.219L3.034 16.93l-.134-.092L.88 4.868c-.021-.25.2-.39.428-.297L7.343 8.36c.09.021.182-.02.244-.082L11.86.452c.13-.18.4-.164.506.033l4.2 7.737c.21.256.39.091.604-.03 1.932-1.095 3.777-2.484 5.706-3.6.11-.07.288-.07.378.028Z"
        fill="#F4A300"
      />
    </G>
    <Defs>
      <ClipPath id="b">
        <Path d="M23.254 4.62a.39.39 0 0 1 .076.23c-.003.399-.198 1.19-.269 1.631-.55 3.422-1.164 6.834-1.706 10.256a.301.301 0 0 1-.297.219L3.034 16.93l-.134-.092L.88 4.868c-.021-.25.2-.39.428-.297L7.343 8.36c.09.021.182-.02.244-.082L11.86.452c.13-.18.4-.164.506.033l4.2 7.737c.21.256.39.091.604-.03 1.932-1.095 3.777-2.484 5.706-3.6.11-.07.288-.07.378.028Z" />
      </ClipPath>
      <ClipPath id="a">
        <Path fill="#fff" d="M.88.326h22.45v16.63H.88z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CrownIcon;
