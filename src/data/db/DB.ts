import { Table } from "dexie";

enum Bool {
  TRUE = 1,
  FALSE = 0,
}

export interface Transaction {
  id?: number;
  Key: string;
  Date: string;
  Description: string;
  Merchant: string;
  MerchantCategory: string;
  Category: string;
  Amount: string;
  Credit: Bool.FALSE | Bool.TRUE;
  Account: string;
  Notes: string;
  Skipped: Bool.FALSE | Bool.TRUE;
}

export class DB extends Dexie {
  transactions!: Table<Transaction>;

  constructor() {
    super("gringotts");
    this.version(1).stores({
      transactions: "++id, skipped",
    });
  }
}

export const db = new DB();
