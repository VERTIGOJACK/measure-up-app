import React, { useState, useEffect } from "react";
import { Button, StyleSheet, View, Text, Animated } from "react-native";


import Furniture from "./measurescreens/furniture/furniture";
import Other from "./measurescreens/other/other";
import Rooms from "./measurescreens/rooms/rooms";

//change these
import FurnitureSVG from "../../assets/Furniture";
import RoomsSVG from "../../assets/Rooms";
import OtherSVG from "../../assets/Other";

import color from "../../styles/color";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Screen() {
  return (
    <Tab.Navigator
      initialRouteName="Furniture"
      screenOptions={{
        tabBarActiveTintColor: color.palette.lightGreen,
        tabBarStyle: {
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}>
      <Tab.Screen
        name="Furniture"
        component={Furniture}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FurnitureSVG color={color} size={size} />
          ),
          tabBarItemStyle: styles.option,
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <RoomsSVG color={color} size={size} />
          ),
          tabBarItemStyle: styles.option,
        }}
      />
      <Tab.Screen
        name="Other"
        component={Other}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <OtherSVG color={color} size={size} />
          ),
          tabBarItemStyle: styles.lastOption,
        }}
      />
    </Tab.Navigator>
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
