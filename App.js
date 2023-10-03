import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Accelerometer } from "expo-sensors";

//ball dimensions for calc
const ballSize = 30;

export default function App() {
  // deconstructs x and y from input
  const [accelerometer, setAccelerometer] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((measurement) => {
        setAccelerometer(measurement);
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

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const handleViewSize = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };

  useEffect(() => {
    let centerOfView = {
      x: viewSize.width / 2,
      y: viewSize.height / 2,
    };

    let position = { x: 0, y: 0 };

    position.x =
      centerOfView.x +
      (accelerometer.x - zeroPoint.x) * centerOfView.x -
      ballSize/2;

    position.y =
      centerOfView.y +
      (accelerometer.y - zeroPoint.y) * centerOfView.y -
      ballSize/2;

    setPosition(position);
  }, [accelerometer]);

  const [zeroPoint, setZeroPoint] = useState({
    x: 0,
    y: 0,
  });

  const handleZeroPoint = () => {
    setZeroPoint(accelerometer);
  };

  //state for subbing to accelerometer
  const [subscription, setSubscription] = useState(null);

  return (
    <View style={styles.container}>
      {/* <StatusBar></StatusBar> */}
      <View style={styles.container} onLayout={handleViewSize}>
        <View style={styles.circle}></View>
        <View
          style={{
            ...styles.bubble,
            left: position.x,
            top: position.y,
          }}></View>
      </View>
      <Button title="Zero" onPress={handleZeroPoint}></Button>
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
  bubble: {
    position: "absolute",
    width: ballSize,
    height: ballSize,
    backgroundColor: "red",
    borderRadius: 100,
  },
  circle: {
    position: "relative",
    width: 50,
    height: 50,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "red",
    borderRadius: 100,
  },
});
