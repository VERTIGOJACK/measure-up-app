import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  // deconstructs x y from setdata input
  const [{ x, y }, setData] = useState({
    x: 0,
    y: 0,
  });

  //state for subbing to accelerometer
  const [subscription, setSubscription] = useState(null);

  //need phone dimensions to find center
  const windowDimensions = useWindowDimensions();

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((measurement) => {
        let center = {
          x: windowDimensions.width / 2,
          y: windowDimensions.height / 2,
        };

        let position = { x: 0, y: 0 };
        position.x = center.x + measurement.x * center.x;
        position.y = center.y + measurement.y * center.y;
        setData(position);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(50);
    return () => _unsubscribe();
  }, []);

  return (
    <View>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <View style={{ ...styles.bubble, left: x, top: y }}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 20,
  },
  bubble: {
    position: "absolute",
    width: 10,
    height: 10,
    backgroundColor: "red",
  },
});
