import { StyleSheet, View } from "react-native";
import color from "../../../styles/color";

export default function Bubble() {
  return <View style={styles.bubble}></View>;
}

const styles = StyleSheet.create({
  bubble: {
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: color.palette.darkBrown,
    position: "relative",
    backgroundColor: color.palette.lightBrown,
    width: "100%",
    height: "100%",
    borderRadius: 100,
    elevation: 20,
  },
});
