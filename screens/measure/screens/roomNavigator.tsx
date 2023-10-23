import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Rooms from "./room/showrooms";
import AddItem from "./room/additemtoroom";
import AddRoom from "./room/addroom";
import Measurements from "./measurements/measurements";
import Spaces from "./room/showspaces";

const Stack = createNativeStackNavigator();

// Your existing component
export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Spaces" component={Spaces} />
      <Stack.Screen name="AddRoom" component={AddRoom} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="Measurements" component={Measurements} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
