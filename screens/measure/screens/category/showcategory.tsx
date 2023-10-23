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
import { useDatabase } from "../../../../database/DbContext";
import { dbItem } from "../../../../database/TableClasses";
import DisplayItem from "../../components/displayItem";
import AddButton from "../../../../components/buttons/addbutton";
import Background from "../../../../components/background/background";

import showStyles from "../../../../styles/showStyles";

export default function Screen(props: any) {
  const navigator = props.navigation;
  const category = props.route.params.category;

  const db = useDatabase();
  const [data, setData] = useState<dbItem[] | null>(null);
  const [rerender, setRerender] = useState(false);

  const TriggerRerender = () => {
    setRerender(!rerender);
  };

  const fetchData = async () => {
    try {
      const itemList = await db?.ItemManager.getItemsFromCategory(category);
      if (itemList) {
        setData(itemList);
      }
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const deleteItem = async (item: dbItem) => {
    try {
      await db?.ItemManager.deleteItem(item);
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
            isLonely={data && data.length == 1 ? true : false}
            onDeletePress={async () => {
              deleteItem(item);
            }}
            onSelectPress={() => {
              navigator.navigate("Measurements", { parentItem: item });
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
          navigator.navigate("AddItem", { category: category });
        }}>
        <AddButton></AddButton>
      </TouchableOpacity>
      <Background></Background>
    </View>
  );
}

const styles = showStyles;
