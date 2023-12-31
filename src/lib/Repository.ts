import Dexie from "dexie";

import { db } from "./DB";
import { DBContents, Transaction } from "./Types";

export async function getMerchants(): Promise<string[]> {
  try {
    const result = await db.transactions
      .where("merchant")
      .notEqual("")
      .uniqueKeys();
    const merchants = result.map((key) => String(key));
    return merchants || [];
  } catch (error) {
    return [];
  }
}

export async function getMerchantCategories(): Promise<string[]> {
  try {
    const result = await db.transactions
      .where("merchantCategory")
      .notEqual("")
      .uniqueKeys();
    const categories = result.map((key) => String(key));
    return categories || [];
  } catch (error) {
    return [];
  }
}

export async function saveTransaction(
  transaction: Transaction
): Promise<string> {
  try {
    await db.transactions.add(transaction);
  } catch (error) {
    return `Error saving transaction: ${error}`;
  }
  return "Transaction saved";
}

export async function saveTransactions(
  transactions: Transaction[]
): Promise<string> {
  try {
    await db.transactions.bulkAdd(transactions);
  } catch (error) {
    if (error instanceof Dexie.BulkError) {
      return `${
        transactions.length - error.failures.length
      } transactions saved, ${error.failures.length} skipped`;
    }
    return `Error saving transactions: ${error}`;
  }
  return `${transactions.length} transactions saved`;
}

export async function updateTransaction(
  transaction: Transaction
): Promise<string> {
  try {
    if (!transaction.id) return `Error updating transaction: no id`;
    await db.transactions.update(transaction.id, transaction);
  } catch (error) {
    return `Error updating transaction: ${error}`;
  }
  return `Transaction updated`;
}

export async function exportDB(): Promise<{
  db: DBContents;
  message: string;
}> {
  try {
    const transactions = await db.transactions.toArray();
    return { db: { transactions }, message: "Export successful" };
  } catch (error) {
    return { db: { transactions: [] }, message: `Error with export: ${error}` };
  }
}

export async function importDB(db: DBContents): Promise<string> {
  try {
    await saveTransactions(db.transactions);
  } catch (error) {
    return `Error with import: ${error}`;
  }
  return "Import successful";
}
