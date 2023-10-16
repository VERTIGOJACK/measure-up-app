import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={57}
      height={30}
      viewBox="0 0 57 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 0a2 2 0 00-2 2v25.393a2 2 0 002 2h52.434a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.757 4.703h-5.29v8.23h5.29v-8.23zm4.703 0h5.29v12.345h-5.29V4.703zm8.818 0h5.29v7.054h-5.29V4.703zm9.994 0h5.29v12.345h-5.29V4.703zm14.108 0h-5.29v7.054h5.29V4.703z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
