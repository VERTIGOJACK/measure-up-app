import * as SQLite from "expo-sqlite";
import migration from "./migration";
import { dbRoom, dbImage, dbItem, dbMeasurement } from "./TableClasses";
import { ItemManager } from "./Managers/ItemManager";
import { ImageManager } from "./Managers/ImageManager";

export class SQLiteService {
  //prop
  private db: SQLite.SQLiteDatabase;

  ItemManager: ItemManager;
  RoomManager;
  MeasurementManager;
  ImageManager: ImageManager;

  private getConnection = () => {
    return SQLite.openDatabase("Measureup.db");
  };

  //constructor
  constructor() {
    this.db = this.getConnection();
    this.ItemManager = new ItemManager(this.db);
    this.ImageManager = new ImageManager(this.db);
  }

  applyMigration() {
    migration(this.db);
  }

  async getItemFromId(id: number): Promise<dbItem> {
    const item = new dbItem();

    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${item.table} WHERE ${item.ID.key} = ?`,
            [id],
            (_, { rows }) => {
              rows._array.forEach((row) => {
                item.FromRow(row);
              });
              resolve(item); // Resolve the promise with the retrieved item
            },
            (error) => {
              console.error(`Error querying ${item.Category.key}: `, error);
              reject(error); // Reject the promise in case of an error
              return false;
            }
          );
        },
        (error) => {
          console.error(`Error during transaction: `, error);
          reject(error); // Reject the promise in case of a transaction error
        }
      );
    });
  }

  async getItemsFromCategory(category: string): Promise<dbItem[]> {
    return new Promise((resolve, reject) => {
      const item = new dbItem();
      const ItemArray: dbItem[] = [];

      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `SELECT * FROM ${item.table} WHERE ${item.Category.key} = ?`,
                [category],
                (_, { rows }) => {
                  rows._array.forEach((row) => {
                    const temporaryItem = new dbItem();
                    temporaryItem.FromRow(row);
                    ItemArray.push(temporaryItem);
                  });
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${item.Category.key}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });

            // The 'result' here is not used, but it ensures the inner Promise completes.
            // You can use it if needed, but it's not required for the query results.
            resolve(ItemArray);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          console.error("Error during transaction: ", error);
          reject(error);
        }
      );
    });
  }

  getItemsFromRoom(roomId: number) {
    return -1;
  }
}
