import { StyleSheet, View } from "react-native";

export default function Bubble() {
  return (
    <View style={styles.bubble}>
      <View style={styles.highlight}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "red",
    position: "relative",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  highlight: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    position: "absolute",
    top: 5,
    left: 5,
    width: "30%",
    height: "30%",
    borderRadius: 100,
  },
});
