
import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, View, Text, Animated } from "react-native";

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text>Hello from measure</Text>
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
});
