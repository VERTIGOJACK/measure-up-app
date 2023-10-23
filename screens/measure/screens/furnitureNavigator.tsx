import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Furniture from "./category/showcategory";
import AddItem from "./category/additemtocategory";
import Measurements from "./measurements/measurements";

const Stack = createNativeStackNavigator();

// Your existing component
export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Furniture"
        component={Furniture}
        options={{
          headerShown: false,
        }}
        initialParams={{ category: "Furniture" }}
      />
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
