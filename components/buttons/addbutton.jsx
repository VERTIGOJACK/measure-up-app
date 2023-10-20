import * as React from "react";
import { StyleSheet, View } from "react-native";
import SVG from "../../assets/buttons/Add";
import color from "../../styles/color";

function Button() {
  return (
    <View style={styles.outer}>
      <SVG
        color={color.palette.lightGreen}
        size={"100%"}
        style={styles.svg}></SVG>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  outer: {
    aspectRatio: "1/1",
    height: "100%",
    width: "100%",
    padding: 5,
    elevation: 10,
    backgroundColor: color.utility.trueWhite,
    borderRadius: 2000,
  },
  svg: {
    aspectRatio: "1/1",
    height: "100%",
    width: "100%",
  },
});
