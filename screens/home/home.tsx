import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Background from "../../components/background/background";
import Logo from "../../assets/Logo.jsx";
import { ApiService } from "../../api/apiservice";
import { IApiPage } from "../../api/Models/iapipage";
import { useFocusEffect } from "@react-navigation/native";
import HTML from "react-native-render-html";
import color from "../../styles/color/color";
import DeleteButton from "../../components/buttons/deletebutton";
import InfoButton from "../../components/buttons/infobutton";

export default function Screen() {
  const apiService = new ApiService();
  const [infoJson, SetInfoJson] = useState<IApiPage | null>(null);
  const [modalToggle, SetModalToggle] = useState(false);

  const FetchData = async () => {
    const response = await apiService.getInfoPage();
    SetInfoJson(response);
  };

  const toggleModal = () => {
    SetModalToggle(!modalToggle);
  };

  useFocusEffect(
    useCallback(() => {
      FetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <InfoButton></InfoButton>
      </TouchableOpacity>
      <View
        style={{
          ...styles.textContainer,
          bottom: modalToggle ? null : -99999999,
        }}>
        <TouchableOpacity style={styles.innerButton} onPress={toggleModal}>
          <DeleteButton></DeleteButton>
        </TouchableOpacity>
        <ScrollView>
          <HTML
            tagsStyles={tagStyles}
            source={{ html: infoJson?.content.rendered || "" }}></HTML>
        </ScrollView>
      </View>
      <Logo></Logo>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "50%", height: "50%" },
  textContainer: {
    position: "absolute",
    zIndex: 10,
    margin: 100,
    width: "100%",
    height: "90%",
    padding: 20,
    backgroundColor: color.utility.trueWhite,
    borderRadius: 10,
  },
  button: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 60,
    height: 60,
    zIndex: 10,
  },
  innerButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 60,
    height: 60,
    zIndex: 10,
  },
});

const tagStyles = StyleSheet.create({
  h1: {
    fontSize: 30,
  },
  h2: {
    fontSize: 30,
  },
  h3: {
    fontSize: 30,
  },
  p: {
    fontSize: 20,
  },
  a: {},
});
