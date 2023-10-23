import { StyleSheet } from "react-native";
import color from "./color/color";

export default styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    backgroundColor: color.utility.trueWhite,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 6,
    borderRadius: 10,
  },
  cameraView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    padding: 20,
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  textInput: {
    flex: 4,
    height: "100%",
    borderWidth: 1,
    borderColor: color.monochrome.lightGray,
    borderRadius: 5,
    fontSize: 30,
    marginEnd: 10,
    padding: 10,
  },
});
