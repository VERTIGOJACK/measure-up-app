import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={39}
      height={37}
      viewBox="0 0 39 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.216 0C1.888 0 0 1.815 0 4.055v28.89C0 35.185 1.888 37 4.216 37h30.568C37.112 37 39 35.185 39 32.945V4.055C39 1.815 37.112 0 34.784 0H4.216zm30.04 4.562H21.609v12.164h12.649V4.562zM30.832 20.78l-9.223 8.87v3.294h3.426l8.96-8.87v-3.294H30.83zm-9.223 3.294l3.426-3.294h-3.426v3.294zm12.649 5.576v3.294H30.83l3.426-3.294zm-16.865-8.87H4.743v12.164h12.649V20.781z"
        fill={props.color}
      />
      <Path
        d="M13.176 22.808c0 1.12-.944 2.028-2.108 2.028-1.165 0-2.109-.908-2.109-2.028s.944-2.027 2.109-2.027c1.164 0 2.108.908 2.108 2.027zM13.176 30.918c0 1.12-.944 2.027-2.108 2.027-1.165 0-2.109-.907-2.109-2.027s.944-2.028 2.109-2.028c1.164 0 2.108.908 2.108 2.028zM8.96 26.863c0 1.12-.944 2.027-2.109 2.027-1.164 0-2.108-.907-2.108-2.027s.944-2.027 2.108-2.027c1.165 0 2.108.907 2.108 2.027zM17.392 26.863c0 1.12-.944 2.027-2.108 2.027-1.165 0-2.108-.907-2.108-2.027s.944-2.027 2.108-2.027c1.164 0 2.108.907 2.108 2.027z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
