import { Image } from "expo-image";
import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Animated,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDatabase } from "../../../../../database/DbContext";
import { dbImage, dbItem } from "../../../../../database/TableClasses";
import AddButton from "../../../../../components/buttons/addbutton";
import Background from "../../../../../components/background/background";
import color from "../../../../../styles/color";
import Placeholder from "../../../../../assets/placeholder.png";
import CameraButton from "../../../../../components/buttons/camerabutton";
import DoneButton from "../../../../../components/buttons/donebutton";
import {
  dbImageToBase64,
  UriToBase64,
  UriToByteArray,
} from "../../../../../helpers/Convert";
import * as ImagePicker from "expo-image-picker";

export default function Screen(props: any) {
  const category = props.route.params.category;
  const navigator = props.navigation;

  const db = useDatabase();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [rerender, setRerender] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const TriggerRerender = () => {
    setRerender(!rerender);
    console.log(rerender);
  };

  const createItem = async () => {
    try {
      const newImage = new dbImage();
      //create base64
      newImage.Data.value = await UriToBase64(image);
      //get filetype
      const filetype = image.split(".").pop();
      newImage.Filetype.value = filetype != null ? filetype : "";
      //upload
      const imageId = await db?.ImageManager.createImage(newImage);
      console.log(imageId);
      const newItem = new dbItem();
      newItem.Category.value = category;
      newItem.Name.value = name;
      newItem.Image_ID.value = imageId != null ? imageId : -1;
      await db?.ItemManager.createItem(newItem);
      navigator.goBack();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const createImage = async () => {
    try {
      const newImage = new dbImage();
      // await db?.imageManager.createItem(newItem);
      TriggerRerender();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log(category);
      console.log(Placeholder);
      console.log(image);
    }, [rerender])
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={image == "" ? Placeholder : image}
        ></Image>
        <View style={styles.cameraView}>
          <TouchableOpacity onPress={pickImage}>
            <CameraButton></CameraButton>
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          ></TextInput>
          <TouchableOpacity
            onPress={async () => {
              createItem();
            }}
          >
            <DoneButton></DoneButton>
          </TouchableOpacity>
        </View>
      </View>
      <Background></Background>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 2,
    borderColor: color.monochrome.lightGray,
    borderRadius: 5,
    fontSize: 30,
    marginEnd: 10,
    padding: 10,
  },
});
