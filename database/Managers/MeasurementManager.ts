import * as SQLite from "expo-sqlite";

import { dbMeasurement } from "../TableClasses";

export class MeasurementManager {
  //prop
  private db: SQLite.SQLiteDatabase;

  //constructor
  constructor(db: SQLite.SQLiteDatabase) {
    this.db = db;
  }

  //Get Methods
  async getMeasurementsByItemId(itemId: number): Promise<dbMeasurement[]> {
    return new Promise((resolve, reject) => {
      const measurement = new dbMeasurement();
      const measurementsArray: dbMeasurement[] = [];

      this.db.transaction(
        async (tx) => {
          try {
            await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `SELECT * FROM ${measurement.table} WHERE ${measurement.Item_ID.key} = ?`,
                [itemId],
                (_, { rows }) => {
                  rows._array.forEach((row) => {
                    const temporaryMeasurement = new dbMeasurement();
                    temporaryMeasurement.FromRow(row);
                    measurementsArray.push(temporaryMeasurement);
                  });
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${measurement.table}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });

            resolve(measurementsArray);
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

  //Get Methods
  async getMeasurementById(id: number): Promise<dbMeasurement> {
    return new Promise((resolve, reject) => {
      const measurement = new dbMeasurement();
      this.db.transaction(
        async (tx) => {
          try {
            await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `SELECT * FROM ${measurement.table} WHERE ${measurement.ID.key} = ?`,
                [id],
                (_, { rows }) => {
                  rows._array.forEach((row) => {
                    measurement.FromRow(row);
                  });
                  resolveTx();
                },
                (error) => {
                  console.error(`Error querying ${measurement.table}: `, error);
                  rejectTx(error);
                  return false;
                }
              );
            });
            resolve(measurement);
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
  async createMeasurement(measurement: dbMeasurement) {
    return new Promise<void>((resolve, reject) => {
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `INSERT INTO ${measurement.table} (${measurement.ID.key},${measurement.Item_ID.key},${measurement.Name.key},${measurement.Unit.key},${measurement.Amount.key})
                VALUES (
                    NULL,
                    ?,
                    ?,
                    ?,
                    ?
                );`,
                [
                  this.nullCheck(measurement.Item_ID.value),
                  measurement.Name.value,
                  measurement.Unit.value,
                  measurement.Amount.value,
                ],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(
                    `Error creating row in ${measurement.table}: `,
                    error
                  );
                  rejectTx(error);
                  return false;
                }
              );
            });
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

  ////////////////update
  async updateMeasurement(measurement: dbMeasurement) {
    return new Promise<void>((resolve, reject) => {
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `UPDATE ${measurement.table}
                SET ${measurement.Name.key} = ?,
                    ${measurement.Unit.key} = ?,
                    ${measurement.Amount.key} = ?
                WHERE ${measurement.ID.key} = ?`,
                [
                  measurement.Name.value,
                  measurement.Unit.value,
                  measurement.Amount.value,
                  measurement.ID.value,
                ],
                () => {
                  console.log(measurement);
                  resolveTx();
                },
                (error) => {
                  console.error(
                    `Error updating row in ${measurement.table}: `,
                    error
                  );
                  rejectTx(error);
                  return false;
                }
              );
            });
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
  async deleteMeasurementById(id: number) {
    return new Promise<void>((resolve, reject) => {
      const measurement = new dbMeasurement();
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `DELETE FROM ${measurement.table} WHERE ${measurement.ID.key} = ?`,
                [id],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(
                    `Error deleting from column ${measurement.ID.key} value ${measurement.ID.value}: `,
                    error
                  );
                  rejectTx(error);
                  return false;
                }
              );
            });
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

  async deleteMeasurementsByItemId(itemId: number) {
    return new Promise<void>((resolve, reject) => {
      const measurement = new dbMeasurement();
      this.db.transaction(
        async (tx) => {
          try {
            const result = await new Promise<void>((resolveTx, rejectTx) => {
              tx.executeSql(
                `DELETE FROM ${measurement.table} WHERE ${measurement.Item_ID.key} = ?`,
                [itemId],
                () => {
                  resolveTx();
                },
                (error) => {
                  console.error(
                    `Error deleting from column ${measurement.ID.key} value ${measurement.ID.value}: `,
                    error
                  );
                  rejectTx(error);
                  return false;
                }
              );
            });
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
