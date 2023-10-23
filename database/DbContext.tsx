// DatabaseContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { SQLiteService } from "./DatabaseService";

const DatabaseContext = createContext<SQLiteService | null>(null);

export const useDatabase = () => {
  return useContext<SQLiteService | null>(DatabaseContext);
};

export const DatabaseProvider = ({ children }: any) => {
  const [db, setDb] = useState<SQLiteService | null>(null);

  useEffect(() => {
    const database = new SQLiteService();
    setDb(database);
  }, []);

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};
