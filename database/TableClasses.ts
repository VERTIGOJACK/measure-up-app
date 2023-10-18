export class dbRoom {
  table: string;
  //props
  ID: { value: number; key: string };
  Name: { value: string; key: string };
  Image_ID: { value: number; key: string };
  ///////////////////////
  constructor() {
    this.table = "Room";
    this.ID = { value: -1, key: "ID" };
    this.Name = { value: "", key: "Name" };
    this.Image_ID = { value: -1, key: "Image_ID" };
  }
  FromRow(row: any) {
    this.ID.value = row.Id;
    this.Name.value = row.Name;
    this.Image_ID.value = row.Image_ID;
  }
}

export class dbItem {
  table: string;
  //props
  ID: { value: number; key: string };
  Name: { value: string; key: string };
  Category: { value: string; key: string };
  Room_ID: { value: number; key: string };
  Image_ID: { value: number; key: string };
  ///////////////////////
  constructor() {
    this.table = "Item";
    this.ID = { value: -1, key: "ID" };
    this.Name = { value: "", key: "Name" };
    this.Category = { value: "", key: "Category" };
    this.Room_ID = { value: -1, key: "Room_ID" };
    this.Image_ID = { value: -1, key: "Image_ID" };
  }
  FromRow(row: any) {
    this.ID.value = row.Id;
    this.Name.value = row.Name;
    this.Category.value = row.Category;
    this.Room_ID.value = row.Room_ID;
    this.Image_ID.value = row.Image_ID;
  }
}

export class dbMeasurement {
  table: string;
  //props
  ID: { value: number; key: string };
  Name: { value: string; key: string };
  Amount: { value: number; key: string };
  Unit: { value: string; key: string };
  Item_ID: { value: number; key: string };
  ///////////////////////
  constructor() {
    this.table = "Measurement";
    this.ID = { value: -1, key: "ID" };
    this.Name = { value: "", key: "Name" };
    this.Amount = { value: -1, key: "Amount" };
    this.Unit = { value: "", key: "Unit" };
    this.Item_ID = { value: -1, key: "Item_ID" };
  }
  FromRow(row: any) {
    this.ID.value = row.Id;
    this.Name.value = row.Name;
    this.Amount.value = row.Amount;
    this.Unit.value = row.Unit;
    this.Item_ID.value = row.Item_ID;
  }
}

export class dbImage {
  table: string;
  //props
  ID: { value: number; key: string };
  Filetype: { value: string; key: string };
  Data: { value: number[]; key: string };
  ///////////////////////
  constructor() {
    this.table = "Image";
    this.ID = { value: -1, key: "ID" };
    this.Filetype = { value: "", key: "Filetype" };
    this.Data = { value: [], key: "Data" };
  }
  FromRow(row: any) {
    this.ID.value = row.Id;
    this.Filetype.value = row.Filetype;
    this.Data.value = row.Data;
  }
}
