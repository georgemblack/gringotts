import { db } from "./DB";
import { Transaction } from "./Types";

export async function saveTransaction(transaction: Transaction): Promise<void> {
  await db.transactions.add(transaction);
}

export async function saveTransactions(
  transactions: Transaction[]
): Promise<void> {
  await db.transactions.bulkAdd(transactions);
}
