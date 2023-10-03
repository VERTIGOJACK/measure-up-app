import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Bubble({ x, y }) {
  console.log(x, y);

  return (
  
      <View style={{ ...styles.bubble, left: x, top: y }}></View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    textAlign: "center",
  },
});
