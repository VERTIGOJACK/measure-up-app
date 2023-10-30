import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15 .833C7.18.833.833 7.18.833 15 .833 22.82 7.18 29.167 15 29.167c7.82 0 14.167-6.347 14.167-14.167C29.167 7.18 22.82.833 15 .833zm7.083 15.584H7.917v-2.834h14.166v2.834z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
