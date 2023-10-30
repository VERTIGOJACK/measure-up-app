import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M19 0C8.512 0 0 8.512 0 19s8.512 19 19 19 19-8.512 19-19S29.488 0 19 0zm-3.8 28.5L5.7 19l2.679-2.679 6.821 6.802L29.621 8.702 32.3 11.4 15.2 28.5z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
