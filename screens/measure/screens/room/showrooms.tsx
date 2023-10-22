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
import { dbItem, dbRoom } from "../../../../database/TableClasses";
import DisplayItem from "../../components/displayItem";
import AddButton from "../../../../components/buttons/addbutton";
import Background from "../../../../components/background/background";

export default function Screen(props: any) {
  const navigator = props.navigation;

  const db = useDatabase();
  const [data, setData] = useState<dbRoom[] | null>(null);
  const [rerender, setRerender] = useState(false);

  const TriggerRerender = () => {
    setRerender(!rerender);
    console.log(rerender);
  };

  const fetchData = async () => {
    try {
      const roomList = await db.RoomManager.getRooms();
      setData(roomList);
      console.log("update");
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  };

  const deleteRoom = async (room: dbRoom) => {
    try {
      await db?.RoomManager.deleteRoomById(room.ID.value);
      await db?.ImageManager.deleteImageById(room.Image_ID.value);

      const items = await db?.ItemManager.getItemsByRoomId(room.ID.value);
      await Promise.all(
        items.map(async (item) => {
          const promises = [];

          promises.push(db?.ItemManager.deleteItemFromId(item.ID.value));
          promises.push(db?.ImageManager.deleteImageById(item.Image_ID.value));
          promises.push(
            db?.MeasurementManager.deleteMeasurementsByItemId(item.ID.value)
          );

          await Promise.all(promises);
        })
      );

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
            isLonely={data.length == 1 ? true : false}
            onDeletePress={async () => {
              deleteRoom(item);
            }}
            onSelectPress={() => {
              navigator.navigate("Spaces", { room: item });
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
          navigator.navigate("AddRoom");
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
