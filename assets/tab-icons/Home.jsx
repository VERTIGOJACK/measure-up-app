import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={34}
      viewBox="0 0 40 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path d="M16 34V22h8v12h10V18h6L20 0 0 18h6v16h10z" fill={props.color} />
    </Svg>
  );
}

export default SvgComponent;
