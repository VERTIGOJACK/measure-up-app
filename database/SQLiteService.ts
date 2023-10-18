import * as SQLite from "expo-sqlite";
import migration from "./migration";
import { dbRoom, dbImage, dbItem, dbMeasurement } from "./TableClasses";

export class SQLiteService {
  //prop
  db: SQLite.SQLiteDatabase;
  //constructor
  constructor() {
    this.db = this.getConnection();
    this.applyMigration();
  }

  getConnection = () => {
    return SQLite.openDatabase("Measureup.db");
  };

  applyMigration() {
    migration(this.db);
  }

  getItemFromId(id: number) {
    const item = new dbItem();
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM ${item.table} WHERE ${item.ID.key} = ?`,
          [id],
          (_, { rows }) => {
            rows._array.forEach((row) => {
              item.FromRow(row);
            });
            console.log(`${item.Category.key}: `, item);
            return item;
          }
        );
      },
      (error) => {
        console.error(`Error querying ${item.Category.key}: `, error);
        return false;
      }
    );
  }

  getItemsFromCategory(category: string) {
    const item = new dbItem();
    const ItemArray: dbItem[] = [];
    this.db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${item.table} WHERE ${item.Category.key} = ?`,
        [category],
        (_, { rows }) => {
          rows._array.forEach((row) => {
            const temporaryItem = new dbItem();
            temporaryItem.FromRow(row);
            ItemArray.push(temporaryItem);
          });
          console.log(`${item.Category.key}: `, ItemArray);
          return ItemArray;
        },
        (error) => {
          console.error(`Error querying ${item.Category.key}: `, error);
          return false;
        }
      );
    });
  }

  getItemsFromRoom(roomId: number) {
    return -1;
  }
}
