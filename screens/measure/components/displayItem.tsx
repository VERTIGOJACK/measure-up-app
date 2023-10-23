import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { dbImage, dbItem } from "../../../database/TableClasses";
import color from "../../../styles/color/color";
import DeleteButton from "../../../components/buttons/deletebutton";
import Placeholder from "../../../assets/placeholder-base64.js";
import { dbImageToBase64 } from "../../../helpers/Convert";
import { useDatabase } from "../../../database/DbContext";
import { useFocusEffect } from "@react-navigation/native";

export default function Component(props: any) {
  const item: dbItem = props.item;
  const isLonely: boolean = props.isLonely;

  const handleDelete = () => {
    props.onDeletePress();
  };

  const handleSelect = () => {
    props.onSelectPress();
  };

  const db = useDatabase();

  const [base64, setBase64] = useState<any>();
  const [itemWidth, setItemWidth] = useState("50%");

  const fetchImage = async () => {
    if (item.Image_ID.value > 0) {
      try {
        const image = await db?.ImageManager.getImageFromId(
          item.Image_ID.value
        );
        await ImageOrPlaceHolder(image);
      } catch (error) {
        // Handle any errors here
        console.error(error);
      }
    } else {
      setBase64(Placeholder);
    }
  };

  ////now how to actually load the image
  const ImageOrPlaceHolder = async (image) => {
    const base64temp = await dbImageToBase64(image);
    setBase64(base64temp);
  };

  useFocusEffect(
    useCallback(() => {
      fetchImage(); // Execute the async function
      setItemWidth(isLonely == true ? "100%" : "50%");
    }, [])
  );

  return (
    <View style={{ ...styles.container, width: itemWidth }}>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <DeleteButton></DeleteButton>
      </TouchableOpacity>
      <TouchableOpacity style={styles.innerContainer} onPress={handleSelect}>
        <Image source={{ uri: base64 }} style={styles.image} />
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
