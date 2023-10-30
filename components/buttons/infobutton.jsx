import * as React from "react";
import { StyleSheet, View } from "react-native";
import SVG from "../../assets/buttons/Info";
import color from "../../styles/color/color";

function Button() {
  return (
    <View style={styles.outer}>
      <View style={styles.svg}>
        <SVG color={color.palette.lightGreen}></SVG>
      </View>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  outer: {
    aspectRatio: "1/1",
    height: "100%",
    width: "100%",
    elevation: 10,
    padding: 5,
    backgroundColor: color.utility.trueWhite,
    borderRadius: 2000,
  },
  svg: {
    height: "100%",
    width: "100%",
  },
});
