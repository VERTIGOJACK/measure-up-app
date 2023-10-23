import * as SQLite from "expo-sqlite";

import { dbRoom, dbImage, dbItem, dbMeasurement } from "../TableClasses";
import { MeasurementManager } from "./MeasurementManager";
import { ImageManager } from "./ImageManager";

export class ItemManager {
  //prop
  private db: SQLite.SQLiteDatabase;

  //constructor
  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }
  //Get Methods
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

  async getItemsByRoomId(roomId: number): Promise<dbItem[]> {
    return new Promise((resolve, reject) => {
      const item = new dbItem();
      const ItemArray: dbItem[] = [];

      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `SELECT * FROM ${item.table} WHERE ${item.Room_ID.key} = ?`,
                [roomId],
                (_, { rows }) => {
                  rows._array.forEach((row) => {
                    const temporaryItem = new dbItem();
                    temporaryItem.FromRow(row);
                    ItemArray.push(temporaryItem);
                  });
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${item.Room_ID.key}: `, error);
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
  ////////////////create
  async createItem(item: dbItem) {
    return new Promise<void>((resolve, reject) => {
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `INSERT INTO Item (Image_ID,Room_ID,Category,Name,ID)
                VALUES (
                    ?,
                    ?,
                    ?,
                    ?,
                    NULL
                );`,
                [
                  this.nullCheck(item.Image_ID.value),
                  this.nullCheck(item.Room_ID.value),
                  item.Category.value,
                  item.Name.value,
                ],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${item.ID.key}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });

            // The 'result' here is not used, but it ensures the inner Promise completes.
            // You can use it if needed, but it's not required for the query results.
            resolve();
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
  ////////////////delete
  async deleteItem(item: dbItem) {
    return new Promise<void>(async (resolve, reject) => {
      this.db.transaction(
        async (tx) => {
          try {
            // Delete the item from the database
            await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `DELETE FROM ${item.table} WHERE ${item.ID.key} = ?`,
                [item.ID.value],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(`Error deleting ${item.ID.key}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });

            // Create instances of MeasurementManager and ImageManager
            const measurementManager = new MeasurementManager(this.db);
            const imageManager = new ImageManager(this.db);

            // Delete measurements associated with the item
            await measurementManager.deleteMeasurementsByItemId(item.ID.value);

            // Delete the associated image
            await imageManager.deleteImageById(item.Image_ID.value);

            resolve(); // Item deletion completed
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

  private nullCheck(number: number) {
    return number == -1 ? "NULL" : number;
  }
}
