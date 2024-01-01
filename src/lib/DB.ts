import Dexie, { Table } from "dexie";

import { Rule, Transaction } from "./Types";

export class DB extends Dexie {
  rules!: Table<Rule>;
  transactions!: Table<Transaction>;

  constructor() {
    super("gringotts");
    this.version(1).stores({
      rules: "++id, &merchant",
      transactions:
        "++id, &key, month, year, merchant, merchantCategory, category, account, skipped, reviewed",
    });
  }
}

export const db = new DB();
