import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 37.952c9.362 0 16.952-7.59 16.952-16.952 0-9.362-7.59-16.952-16.952-16.952-9.362 0-16.952 7.59-16.952 16.952 0 9.362 7.59 16.952 16.952 16.952zM21 42c11.598 0 21-9.402 21-21S32.598 0 21 0 0 9.402 0 21s9.402 21 21 21z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 30.361A9.361 9.361 0 0030.361 21 9.361 9.361 0 0021 11.639 9.361 9.361 0 0011.639 21 9.361 9.361 0 0021 30.361zm0 4.049c7.406 0 13.41-6.004 13.41-13.41 0-7.406-6.004-13.41-13.41-13.41-7.406 0-13.41 6.004-13.41 13.41 0 7.406 6.004 13.41 13.41 13.41z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
