import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, View, Text, Animated, Image } from "react-native";
import Background from "../../components/background/background";
import Logo from "../../assets/Logo.jsx";

export default function Screen() {
  return (
    <View style={styles.container}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "50%", height: "50%" },
});
