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
import { NavigationContext, useFocusEffect } from "@react-navigation/native";
import { useDatabase } from "../../../../../database/DbContext";
import { dbItem } from "../../../../../database/TableClasses";
import DisplayItem from "../../../components/displayItem";
import AddButton from "../../../../../components/buttons/addbutton";
import Background from "../../../../../components/background/background";

export default function Screen(props) {
  const navigator = props.navigation;

  const db = useDatabase();
  const [data, setData] = useState<dbItem[] | null>(null);
  const [rerender, setRerender] = useState(false);

  const TriggerRerender = () => {
    setRerender(!rerender);
    console.log(rerender);
  };

  const fetchData = async () => {
    try {
      const furnitureList = await db.ItemManager.getItemsFromCategory(
        "Furniture"
      );
      setData(furnitureList);
      console.log("update");
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const createItem = async () => {
    try {
      const newItem = new dbItem();
      newItem.Category.value = "Furniture";
      newItem.Name.value = "A new name for my item";
      await db?.ItemManager.createItem(newItem);
      TriggerRerender();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await db?.ItemManager.deleteItemFromId(id);
      TriggerRerender();
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Execute the async function
    }, [rerender])
  );

  return (
    <View style={styles.container}>
      {/* <DisplayItem item={data ? data[0] : new dbItem()}></DisplayItem> */}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <DisplayItem
            item={item}
            onDeletePress={async () => {
              deleteItem(item.ID.value);
            }}></DisplayItem>
        )}
        keyExtractor={(item) => {
          return item.ID.value.toString();
        }}
        horizontal={false}
        numColumns={2}></FlatList>
      <TouchableOpacity
        style={styles.addContainer}
        onPress={() => {
          navigator.navigate("AddItem", { category: "Furniture" });
        }}>
        <AddButton></AddButton>
      </TouchableOpacity>
      <Background></Background>
    </View>
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
  addContainer: {
    position: "absolute",
    bottom: 0,
    height: 80,
    padding: 10,
    width: "auto",
  },
});
