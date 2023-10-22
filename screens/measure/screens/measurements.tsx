import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDatabase } from "../../../database/DbContext";
import { dbItem, dbMeasurement } from "../../../database/TableClasses";
import DisplayMeasurement from "../components/displayMeasurement";
import AddButton from "../../../components/buttons/addbutton";
import Background from "../../../components/background/background";

export default function Screen(props: any) {
  const item: dbItem = props.route.params.parentItem;
  const navigation = props.navigation;

  const db = useDatabase();
  const [data, setData] = useState<dbMeasurement[] | null>(null);
  const [rerender, setRerender] = useState(false);

  const TriggerRerender = () => {
    setRerender(!rerender);
    console.log(rerender);
  };

  const fetchData = async () => {
    try {
      const measurementList =
        await db?.MeasurementManager.getMeasurementsByItemId(item.ID.value);
      setData(measurementList);
      console.log("update");
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const createMeasurement = async () => {
    try {
      console.log(item);
      const newMeasurement = new dbMeasurement();
      newMeasurement.Item_ID.value = item.ID.value;
      await db?.MeasurementManager.createMeasurement(newMeasurement);
      TriggerRerender();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const deleteMeasurement = async (id: number) => {
    try {
      await db?.MeasurementManager.deleteMeasurementById(id);
      TriggerRerender();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Execute the async function
      navigation.setOptions({ title: item.Name.value });
    }, [rerender])
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={({ item }) => (
          <DisplayMeasurement
            item={item}
            onDeletePress={async () => {
              deleteMeasurement(item.ID.value);
            }}></DisplayMeasurement>
        )}
        keyExtractor={(item) => {
          return item.ID.value.toString();
        }}
        ListFooterComponent={() => (
          <View style={styles.addContainer}>
            <TouchableOpacity
              style={styles.addContainer}
              onPress={createMeasurement}>
              <AddButton></AddButton>
            </TouchableOpacity>
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addContainer: {
    bottom: 0,
    height: 80,
    padding: 10,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    bottom: 0,
    height: 80,
    padding: 10,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    width: "100%",
    height: "100%",
  },
});
