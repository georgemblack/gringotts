import Dexie, { Table } from "dexie";

import { Transaction } from "./Types";

export class DB extends Dexie {
  transactions!: Table<Transaction>;

  constructor() {
    super("gringotts");
    this.version(1).stores({
      transactions:
        "++id, &key, merchant, merchantCategory, category, skipped, reviewed",
    });
  }
}

export const db = new DB();
