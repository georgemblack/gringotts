import {
  C1CreditRecord,
  Transaction,
  Bool,
  Account,
  AppleCardCreditRecord,
} from "./Types";

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

export function validTransaction(transaction: Transaction): boolean {
  return transaction.amount !== "" || transaction.amount === undefined;
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
    description: record.Description,
    merchant: "",
    merchantCategory: "",
    category: "",
    amount: amount,
    credit: credit,
    account: account,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function c1CreditRecordsToTransactions(
  records: C1CreditRecord[],
  account: Account
): Transaction[] {
  return records.map((record) => c1CreditRecordToTransaction(record, account));
}

/**
 * Convert a record from an Apple Card credit account to a standard transaction.
 */
export function appleCardCreditRecordToTransaction(
  record: AppleCardCreditRecord,
  account: Account
): Transaction {
  // Convert date from 'MM/DD/YYYY' to 'YYYY-MM-DD'
  const date = record["Transaction Date"].split("/").reverse().join("-");

  // If amount is negative, it's a credit
  const credit =
    record["Amount (USD)"].startsWith("-") === true ? Bool.TRUE : Bool.FALSE;

  // Remove negative sign from amount if it's a credit
  const amount =
    credit === Bool.TRUE
      ? record["Amount (USD)"].substring(1)
      : record["Amount (USD)"];

  return {
    key: generateRecordId(record),
    date,
    description: record.Description,
    merchant: "",
    merchantCategory: "",
    category: "",
    amount,
    credit,
    account: account,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function appleCardCreditRecordsToTransactions(
  records: AppleCardCreditRecord[],
  account: Account
): Transaction[] {
  return records.map((record) =>
    appleCardCreditRecordToTransaction(record, account)
  );
}
