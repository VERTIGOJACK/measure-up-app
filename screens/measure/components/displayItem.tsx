import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { dbItem } from "../../../database/TableClasses";

export default function Component(props: any) {
  const item: dbItem = props.item;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("./placeholder.png")} style={styles.image} />
        <Text>{item.Name.value}</Text>
        <Text>{item.ID.value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "50%",
    height: 300,
    padding: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderWidth: 1,
  },
  image: {
    height: 50,
    width: "100%",
    flex: 1,
  },
});
