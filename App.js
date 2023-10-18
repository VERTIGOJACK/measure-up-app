import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import Home from "./screens/home/home";
import Measure from "./screens/measure/measure";
import Level from "./screens/level/level";

import RulerSVG from "./assets/Ruler";
import LevelSVG from "./assets/Level";
import HomeSVG from "./assets/Home";

import color from "./styles/color";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SQLiteService } from "./database/SQLiteService";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const dbService = new SQLiteService();
    dbService.getItemsFromCategory("Furniture");
  }, []);

  return (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <Tab.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <HomeSVG color={color} size={size} />
            ),
            tabBarItemStyle: styles.option,
          }}
        />
        <Tab.Screen
          name="Measure"
          component={Measure}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <RulerSVG color={color} size={size} />
            ),
            tabBarItemStyle: styles.option,
          }}
        />
        <Tab.Screen
          name="Level"
          component={Level}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <LevelSVG color={color} size={size} />
            ),
            tabBarItemStyle: styles.lastOption,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
  option: {
    height: "50%",
    top: 25,
    borderStyle: "solid",
    borderRightWidth: 1,
    borderColor: color.monochrome.lightGray,
  },
  lastOption: {
    height: "50%",
    top: 25,
  },
});
