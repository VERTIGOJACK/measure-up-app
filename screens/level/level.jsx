import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import Bubble from "./components/bubble.jsx";
import Background from "../../components/background/background.jsx";
import color from "../../styles/color/color.js";
// import { LinearGradient } from "expo-linear-gradient";

//ball dimensions for calc
const ballSize = 80;
const halfBallsize = ballSize / 2;

export default function Screen() {
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
      (accelerometer.x - zeroPoint.x) * 4 * (centerOfView.x - halfBallsize);

    position.y =
      centerOfView.y +
      //invert sensor y to mimic bubble behavior
      (-accelerometer.y + zeroPoint.y) * 4 * (centerOfView.y - halfBallsize);

    //pythagoras
    const distance = Math.sqrt(
      Math.pow(centerOfView.x - position.x, 2) +
        Math.pow(centerOfView.y - position.y, 2)
    );

    const maxDistance = centerOfView.x - halfBallsize;

    if (distance > maxDistance) {
      const scalingFactor = maxDistance / distance;
      // Calculate the new position that respects the allowed distance
      const newX =
        centerOfView.x + (position.x - centerOfView.x) * scalingFactor;
      const newY =
        centerOfView.y + (position.y - centerOfView.y) * scalingFactor;

      // Update the ball's position
      position.x = newX;
      position.y = newY;
    }

    //By applying this logic, the ball will always stay within the allowed distance (x)
    //from the center while having free movement within the grid.
    //If the ball exceeds this distance, it will be repositioned to maintain the desired constraint.
    if (isNaN(position.x) || isNaN(position.y)) {
      position.x = 0;
      position.y = 0;
    }
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
      {/* add containing container her so that flex can be used */}
      <View style={styles.outerContainer}>
        <View style={styles.levelContainer} onLayout={handleViewSize}>
          <View style={styles.level}></View>
          <View style={styles.circle}></View>
          {/* <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.background}
        /> */}
          <Animated.View
            style={{
              ...styles.bubble,
              left: animatedValue.x,
              top: animatedValue.y,
            }}>
            <Bubble></Bubble>
          </Animated.View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleZeroPoint} style={styles.button}>
          <Text style={styles.text}>Zero</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClear} style={styles.button}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
      <Background></Background>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  outerContainer: {
    display: "flex",
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  bubble: {
    position: "absolute",
    width: ballSize,
    height: ballSize,
    transform: [{ translateX: -halfBallsize }, { translateY: -halfBallsize }],
    zIndex: -3,
  },
  level: {
    position: "absolute",
    width: "100%",
    height: "100",
    borderWidth: 20,
    aspectRatio: "1/1",
    borderStyle: "solid",
    borderColor: color.palette.lightGreen,
    borderRadius: 2000,
    elevation: 5,
  },
  levelContainer: {
    flexDirection: "column",
    width: "100%",
    height: "100",
    aspectRatio: "1/1",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2000,
    backgroundColor: color.palette.darkGreen,
  },
  circle: {
    position: "absolute",
    width: 80,
    height: 80,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: color.palette.lightGreen,
    borderRadius: 100,
  },
  button: {
    backgroundColor: color.utility.trueWhite,
    height: "100%",
    width: "40%",
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: color.palette.darkGreen,
  },
});
