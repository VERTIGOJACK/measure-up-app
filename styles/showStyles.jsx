import { StyleSheet } from "react-native";
import color from "./color/color";

export default styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addContainer: {
    position: "absolute",
    bottom: 0,
    height: 80,
    padding: 10,
    width: "auto",
  },
});
