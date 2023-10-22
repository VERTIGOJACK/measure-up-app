import * as SQLite from "expo-sqlite";

import { dbRoom, dbImage, dbItem, dbMeasurement } from "../TableClasses";

export class RoomManager {
  //prop
  private db: SQLite.SQLiteDatabase;

  //constructor
  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }
  //Get Methods
  async getRoomById(id: number): Promise<dbRoom> {
    const room = new dbRoom();

    return new Promise((resolve, reject) => {
      this.db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${room.table} WHERE ${room.ID.key} = ?`,
            [id],
            (_, { rows }) => {
              rows._array.forEach((row) => {
                room.FromRow(row);
              });
              resolve(room); // Resolve the promise with the retrieved item
            },
            (error) => {
              console.error(`Error querying ${room.ID.key}: `, error);
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

  async getRooms(): Promise<dbRoom[]> {
    return new Promise((resolve, reject) => {
      const room = new dbRoom();
      const roomArray: dbRoom[] = [];

      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `SELECT * FROM ${room.table}`,
                [],
                (_, { rows }) => {
                  rows._array.forEach((row) => {
                    const temporaryRoom = new dbRoom();
                    temporaryRoom.FromRow(row);
                    roomArray.push(temporaryRoom);
                  });
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${room.table}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });

            // The 'result' here is not used, but it ensures the inner Promise completes.
            // You can use it if needed, but it's not required for the query results.
            resolve(roomArray);
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
  async createRoom(room: dbRoom) {
    return new Promise<void>((resolve, reject) => {
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `INSERT INTO ${room.table} (${room.ID.key},${room.Image_ID.key},${room.Name.key})
                VALUES (
                    NULL,
                    ?,
                    ?                    
                );`,
                [this.nullCheck(room.Image_ID.value), room.Name.value],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(`Error inserting into ${room.table}: `, error);
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
  async deleteRoomById(roomId: number) {
    return new Promise<void>((resolve, reject) => {
      const room = new dbRoom();
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `DELETE FROM ${room.table} WHERE ${room.ID.key} = ?`,
                [roomId],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(
                    `Error deleting id ${roomId} from ${room.table}: `,
                    error
                  );
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
