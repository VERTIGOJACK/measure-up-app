import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={48}
      height={props.size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_3_284)" fill={props.color}>
        <Path d="M24 30.4a6.4 6.4 0 100-12.8 6.4 6.4 0 000 12.8z" />
        <Path d="M18 4l-3.66 4H8c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4h-6.34L30 4H18zm6 30c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z" />
      </G>
      <Defs>
        <ClipPath id="clip0_3_284">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
