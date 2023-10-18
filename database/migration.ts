import SQLite from "expo-sqlite";

const migration = (db: SQLite.SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Image (
              ID       INTEGER PRIMARY KEY AUTOINCREMENT
                               NOT NULL,
              Filetype TEXT    NOT NULL,
              Data     TEXT    NOT NULL
          );
          `,
      [],
      () => {
        //  console.log("Table image created successfully");
      },
      (error) => {
        console.error("Error creating table image: ", error);
        return false;
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Room (
                ID       INTEGER PRIMARY KEY AUTOINCREMENT
                                 NOT NULL,
                Name     TEXT,
                Image_ID INTEGER REFERENCES Image (ID) ON DELETE SET NULL
            );`,
      [],
      () => {
        // console.log("Table room created successfully");
      },
      (error) => {
        console.error("Error creating table room: ", error);
        return false;
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Item (
              ID       INTEGER PRIMARY KEY AUTOINCREMENT
                               NOT NULL,
              Name     TEXT,
              Category TEXT    NOT NULL,
              Room_ID  INTEGER REFERENCES Room (ID) ON DELETE CASCADE,
              Image_ID INTEGER REFERENCES Image (ID) ON DELETE SET NULL
          );
          `,
      [],
      () => {
        //console.log("Table item created successfully");
      },
      (error) => {
        console.error("Error creating table item: ", error);
        return false;
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Measurement (
        ID      INTEGER PRIMARY KEY AUTOINCREMENT
                        NOT NULL,
        Name    TEXT,
        Amount  NUMERIC,
        Unit    TEXT,
        Item_ID INTEGER NOT NULL
                        REFERENCES Item (ID) ON DELETE CASCADE
    );`,
      [],
      () => {
        //console.log("Table measurement created successfully");
      },
      (error) => {
        console.error("Error creating table measurement: ", error);
        return false;
      }
    );
    DummyData(tx);
  });
};

const DummyData = (tx: SQLite.SQLTransaction) => {
  tx.executeSql("DELETE FROM Item");
  tx.executeSql(
    `INSERT INTO Item (
        Image_ID,
        Room_ID,
        Category,
        Name,
        ID
    )
    VALUES (
        NULL,
        NULL,
        'Furniture',
        'Another table',
        NULL
    ),
    (
        NULL,
        NULL,
        'Furniture',
        'My table',
        NULL
    );`,
    [],
    () => {
      console.log("Dummy data created successfully");
    },
    (error) => {
      console.error("Error creating dummy data: ", error);
      return false;
    }
  );
};

export default migration;
