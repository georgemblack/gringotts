import { C1CreditRecord, Transaction, Bool, Account } from "./Types";

/**
 * Generate a unique identifier for a raw transaction by:
 * 1. Sorting the keys of the raw transaction
 * 2. Concatenating the values of the sorted keys
 * 3. Removing all whitespace
 */
export function generateRecordId(record: any): string {
  let id = "";
  const keys = Object.keys(record);
  keys.sort();
  for (const key of keys) id += record[key];
  id = id.replace(/\s/g, "");
  return id;
}

/**
 * Convert a record from a C1 credit account to a standard transaction.
 */
export function c1CreditRecordToTransaction(
  record: C1CreditRecord,
  account: Account
): Transaction {
  const amount = record.Debit !== "" ? record.Debit : record.Credit;
  const credit = record.Debit !== "" ? Bool.FALSE : Bool.TRUE;

  return {
    key: generateRecordId(record),
    date: record["Transaction Date"],
    description: "",
    merchant: record.Description,
    merchantCategory: "",
    category: "",
    amount: amount,
    credit: credit,
    account: account,
    notes: "",
    skipped: Bool.FALSE,
  };
}

export function c1CreditRecordsToTransactions(
  records: C1CreditRecord[],
  account: Account
): Transaction[] {
  return records.map((record) => c1CreditRecordToTransaction(record, account));
}

export function validTransaction(transaction: Transaction): boolean {
  return transaction.amount !== "" && transaction.merchant !== "";
}
