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
}
