import * as SQLite from "expo-sqlite";

import { dbRoom, dbImage, dbItem, dbMeasurement } from "../TableClasses";

export class ImageManager {
  //prop
  private db: SQLite.SQLiteDatabase;

  //constructor
  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  //Get Methods
  async getImageFromId(id: number): Promise<dbImage> {
    const image = new dbImage();

    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${image.table} WHERE ${image.ID.key} = ?`,
            [id],
            (_, { rows }) => {
              rows._array.forEach((row) => {
                image.FromRow(row);
              });
              resolve(image); // Resolve the promise with the retrieved item
            },
            (error) => {
              console.error(`Error querying ${image.ID.key}: `, error);
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

  ////////////////create
  async createImage(image: dbImage) {
    return new Promise<number>((resolve, reject) => {
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<number>((resolveTx, rejectTx) => {
              tx.executeSql(
                `INSERT INTO ${image.table} (${image.ID.key},${image.Filetype.key},${image.Data.key})
                VALUES (
                    NULL,
                    ?,
                    ?
                );`,
                [image.Filetype.value, image.Data.value],
                (tx, resultSet) => {
                  const number: number =
                    resultSet.insertId != null ? resultSet.insertId : -1;
                  resolveTx(number);
                },
                (error) => {
                  console.error(`Error inserting into ${image.table}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });
            resolve(result);
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
  async deleteItemFromId(id: number) {
    return new Promise<void>((resolve, reject) => {
      const image = new dbImage();
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `DELETE FROM ${image.table} WHERE ${image.ID.key} = ?`,
                [id],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${image.ID.key}: `, error);
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

  private nullCheck(number: number) {
    return number == -1 ? "NULL" : number;
  }
}
