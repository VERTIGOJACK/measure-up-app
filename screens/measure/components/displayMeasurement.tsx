import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { dbImage, dbItem, dbMeasurement } from "../../../database/TableClasses";
import color from "../../../styles/color";
import DeleteButton from "../../../components/buttons/deletebutton";
import Placeholder from "../../../assets/placeholder-base64.js";
import { dbImageToBase64 } from "../../../helpers/Convert";
import { useDatabase } from "../../../database/DbContext";
import { useFocusEffect } from "@react-navigation/native";

export default function Component(props: any) {
  const measurement: dbMeasurement = props.item;

  const handleDelete = () => {
    props.onDeletePress();
  };

  const handleSelect = () => {
    props.onSelectPress();
  };

  const db = useDatabase();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [amount, setAmount] = useState("");

  const updateItem = async () => {
    try {
      console.log("fire");
      const newMeasurement = new dbMeasurement();
      newMeasurement.ID.value = measurement.ID.value;
      newMeasurement.Name.value = name;
      newMeasurement.Unit.value = unit;
      newMeasurement.Amount.value = parseFloat(amount);
      console.log(newMeasurement);
      await db?.MeasurementManager.updateMeasurement(newMeasurement);
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  //yeah its a lot of database operations, but relying on state introduces more trouble than its worth.
  const fetchData = async () => {
    try {
      const getMeasurement = await db?.MeasurementManager.getMeasurementById(
        measurement.ID.value
      );
      setName(getMeasurement.Name.value);
      setUnit(getMeasurement.Unit.value);
      const tempAmount =
        getMeasurement.Amount.value == -1 || null || NaN
          ? ""
          : getMeasurement.Amount.value;
      setAmount(tempAmount.toString());
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <DeleteButton></DeleteButton>
      </TouchableOpacity>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onBlur={async () => {
            updateItem();
          }}></TextInput>
        <TextInput
          style={styles.textInputNumber}
          placeholder="Amount"
          value={amount.toString()}
          onChangeText={(text) => setAmount(text)}
          onBlur={async () => {
            updateItem();
          }}
          keyboardType="numeric"></TextInput>
        <TextInput
          style={styles.textInputLast}
          placeholder="Unit"
          value={unit}
          onChangeText={(text) => setUnit(text)}
          onBlur={async () => {
            updateItem();
          }}></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: 80,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 5,
    backgroundColor: color.utility.trueWhite,
    elevation: 10,
  },
  image: {
    width: "100%",
    flex: 3,
    borderRadius: 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  font: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 20,
  },
  button: {
    position: "absolute",
    height: 50,
    right: 0,
    zIndex: 1,
  },
  textInput: {
    flex: 2,
    height: "100%",
    borderWidth: 1,
    borderColor: color.monochrome.lightGray,
    borderRadius: 5,
    fontSize: 15,
    marginEnd: 10,
    padding: 10,
  },
  textInputNumber: {
    flex: 1,
    height: "100%",
    borderWidth: 1,
    borderColor: color.monochrome.lightGray,
    borderRadius: 5,
    fontSize: 15,
    marginEnd: 10,
    padding: 10,
  },
  textInputLast: {
    flex: 1,
    height: "100%",
    borderWidth: 1,
    borderColor: color.monochrome.lightGray,
    borderRadius: 5,
    fontSize: 15,
    marginEnd: 40,
    padding: 10,
  },
});
