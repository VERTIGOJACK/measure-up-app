import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M22.5 0C10.08 0 0 10.08 0 22.5S10.08 45 22.5 45 45 34.92 45 22.5 34.92 0 22.5 0zm11.25 24.75h-9v9h-4.5v-9h-9v-4.5h9v-9h4.5v9h9v4.5z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
