import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  Animated,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useDatabase } from "../../../../database/DbContext";
import { dbItem } from "../../../../database/TableClasses";
import displayItem from "../../components/displayItem";

export default function Screen() {
  const db = useDatabase();
  const [data, setData] = useState<dbItem[] | null>(null);
  const [rerender, setRerender] = useState(false);

  const TriggerRerender = () => {
    setRerender(!rerender);
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
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const deleteItem = async () => {
    try {
      const newItem = new dbItem();
      newItem.ID.value = 1;
      await db?.ItemManager.deleteItemFromId(newItem.ID.value);
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData(); // Execute the async function
      createItem(); // create item
      deleteItem(); // delete item
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={displayItem}
        keyExtractor={(item) => {
          return item.ID.value.toString();
        }}
        horizontal={false}
        numColumns={2}
      ></FlatList>
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
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
