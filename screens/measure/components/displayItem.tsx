import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { dbImage, dbItem } from "../../../database/TableClasses";
import color from "../../../styles/color";
import DeleteButton from "../../../components/buttons/deletebutton";
import Placeholder from "../../../assets/placeholder.png";
import { dbImageToBase64 } from "../../../helpers/Convert";

export default function Component(props: any) {
  const item: dbItem = props.item;

  const handleDelete = () => {
    props.onDeletePress();
  };

  const handleSelect = () => {
    props.onSelectPress();
  };
////ahhhhhh its not importing the image anyehreweewewewew
  const ImageOrPlaceHolder = (item : dbItem) => {
    if (item. != "") {
      return dbImageToBase64(image);
    } else return Placeholder;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <DeleteButton></DeleteButton>
      </TouchableOpacity>
      <TouchableOpacity style={styles.innerContainer} onPress={handleSelect}>
        <Image source={ImageOrPlaceHolder(item)} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.font}>{item.Name.value}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "50%",
    height: 250,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 5,
    backgroundColor: color.utility.trueWhite,
    elevation: 10,
  },
  image: {
    width: "100%",
    flex: 3,
    borderRadius: 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  font: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 20,
  },
  button: {
    position: "absolute",
    height: 50,
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
