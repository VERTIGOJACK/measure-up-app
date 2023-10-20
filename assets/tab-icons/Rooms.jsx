import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={35}
      viewBox="0 0 40 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.714 35V18.381H0L20.373 0 40 18.381h-4.969V35H5.714zm5.466-13.093v9.064h3.727V27.95H25.59v3.021h3.727v-9.064s-.61-1.088-1.242-1.511c-.826-.553-2.485-.504-2.485-.504v-3.777c-.242-.295-.2-.686-.497-1.007-.239-.26-.503-.209-.745-.504h-7.95s-.688.193-.994.504c-.307.31-.497 1.007-.497 1.007v3.777s-1.659-.049-2.485.504c-.632.423-1.242 1.51-1.242 1.51z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
