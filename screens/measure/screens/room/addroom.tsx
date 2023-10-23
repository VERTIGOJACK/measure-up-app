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
import { useDatabase } from "../../../../database/DbContext";
import { dbImage, dbItem, dbRoom } from "../../../../database/TableClasses";
import Background from "../../../../components/background/background";
import color from "../../../../styles/color/color";
import Placeholder from "../../../../assets/placeholder-base64.js";
import CameraButton from "../../../../components/buttons/camerabutton";
import DoneButton from "../../../../components/buttons/donebutton";
import { dbImageToBase64 } from "../../../../helpers/Convert";
import * as ImagePicker from "expo-image-picker";

import addStyles from "../../../../styles/addStyles";

export default function Screen(props: any) {
  const navigator = props.navigation;

  const db = useDatabase();

  const [name, setName] = useState("");
  const [cameraImage, setCameraImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setCameraImage(result.assets[0]);
    }
  };

  const createRoom = async () => {
    try {
      //image
      const imageId = await createImage();
      //item
      const newRoom = new dbRoom();
      //assign imageID
      newRoom.Image_ID.value = imageId != null ? imageId : -1;
      //assign name
      newRoom.Name.value = name;
      //write to database
      await db?.RoomManager.createRoom(newRoom);
      //navigate
      navigator.goBack();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const createImage = async (): Promise<number> => {
    let result = -1;
    try {
      if (cameraImage?.base64 != undefined) {
        //image
        const newImage = new dbImage();
        //create base64
        newImage.Data.value = cameraImage?.base64;
        //get filetype
        const filetype = cameraImage?.uri.split(".").pop();
        newImage.Filetype.value = filetype != null ? filetype : "";
        //creating image returns newly created id
        const response = await db?.ImageManager.createImage(newImage);
        if (response) {
          result = response;
        }
      }
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
    return result;
  };

  useFocusEffect(
    useCallback(() => {
      navigator.setOptions({ title: `Add new Room` });
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={{
            uri: cameraImage?.uri == undefined ? Placeholder : cameraImage.uri,
          }}></Image>
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
            onChangeText={(text) => setName(text)}></TextInput>
          <TouchableOpacity
            onPress={async () => {
              createRoom();
            }}>
            <DoneButton></DoneButton>
          </TouchableOpacity>
        </View>
      </View>
      <Background></Background>
    </View>
  );
}

const styles = addStyles;
