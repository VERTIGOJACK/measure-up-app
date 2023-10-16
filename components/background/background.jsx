import color from "../../styles/color";
import { StyleSheet, View } from "react-native";

const bubbleSize = 250;

export default function Background() {
  return (
    <View style={styles.container}>
      <View style={styles.bubble1}></View>
      <View style={styles.bubble2}></View>
      <View style={styles.bubble4}></View>
      <View style={styles.bubble3}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -9999,
  },
  bubble1: {
    position: "absolute",
    height: bubbleSize,
    width: bubbleSize,
    borderRadius: bubbleSize,
    top: "50%",
    left: "-40%",
    backgroundColor: color.palette.darkGreen,
  },
  bubble2: {
    position: "absolute",
    height: bubbleSize,
    width: bubbleSize,
    borderRadius: bubbleSize,
    top: "75%",
    left: "-20%",
    backgroundColor: color.palette.lightGreen,
  },
  bubble3: {
    position: "absolute",
    height: bubbleSize,
    width: bubbleSize,
    borderRadius: bubbleSize,
    top: "0%",
    right: "-40%",
    backgroundColor: color.palette.darkBrown,
  },
  bubble4: {
    position: "absolute",
    height: bubbleSize,
    width: bubbleSize,
    borderRadius: bubbleSize,
    top: "-20%",
    right: "-20%",
    backgroundColor: color.palette.lightBrown,
  },
});
