import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox={`0 0 60 60`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M30 0C13.44 0 0 13.44 0 30c0 16.56 13.44 30 30 30 16.56 0 30-13.44 30-30C60 13.44 46.56 0 30 0zm3 45h-6V27h6v18zm0-24h-6v-6h6v6z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
