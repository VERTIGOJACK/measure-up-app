import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Button, StyleSheet, View, Animated } from "react-native";
import { Accelerometer } from "expo-sensors";
import Bubble from "./Bubble";

//ball dimensions for calc
const ballSize = 40;

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
    Accelerometer.setUpdateInterval(100);
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

  //on accelerometer change, calculates what position the dot should have on the screen
  useEffect(() => {
    let centerOfView = {
      x: viewSize.width / 2,
      y: viewSize.height / 2,
    };

    let position = { x: 0, y: 0 };

    position.x =
      centerOfView.x +
      (accelerometer.x - zeroPoint.x) * centerOfView.x -
      ballSize / 2;

    position.y =
      centerOfView.y +
      //invert sensor y to mimic bubble behavior
      (-accelerometer.y + zeroPoint.y) * centerOfView.y -
      ballSize / 2;

    setPosition(position);
    smooth(position);
  }, [accelerometer]);

  const [zeroPoint, setZeroPoint] = useState({
    x: 0,
    y: 0,
  });

  //setting and removing zero point

  const handleZeroPoint = () => {
    setZeroPoint(accelerometer);
  };

  const handleClear = () => {
    setZeroPoint({ x: 0, y: 0 });
  };

  //state for subbing to accelerometer
  const [subscription, setSubscription] = useState(null);

  //for smoothed positional updates
  const animatedValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const smooth = (newPosition) => {
    Animated.timing(animatedValue, {
      toValue: { x: newPosition.x, y: newPosition.y },
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.container} onLayout={handleViewSize}>
        <View style={styles.circle}></View>
        <Animated.View
          style={{
            ...styles.bubble,
            left: animatedValue.x,
            top: animatedValue.y,
          }}>
          <Bubble></Bubble>
        </Animated.View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Set Zero Point" onPress={handleZeroPoint}></Button>
        <Button title="Clear " onPress={handleClear}></Button>
      </View>
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
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  bubble: {
    position: "absolute",
    width: ballSize,
    height: ballSize,
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
