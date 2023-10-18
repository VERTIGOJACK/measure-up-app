import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={48}
      height={34}
      viewBox="0 0 48 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.785 18.473c0-3.205-3.775-7.345-5.662-9.015 0-5.81 2.462-8.431 3.692-9.016 5.58-.333 18.019-.8 23.139 0 5.12.802 4.923 6.345 4.184 9.016-2.56 2.204-3.856 6.929-4.184 9.015h-21.17z"
        fill={props.color}
      />
      <Path
        d="M8.123 14.216l1.97 7.763h27.322c0-1.168.739-4.357 3.693-7.763 2.954-3.406 5.825.084 6.892 2.254-.656 1.836-2.265 6.31-3.446 9.516-1.182 3.206-5.251 4.007-7.139 4.007V34h-4.184v-4.007H13.785V34h-3.693v-4.007c-2.954.2-5.169-1.419-5.907-2.254L0 16.47c.788-6.01 5.744-4.006 8.123-2.253z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
