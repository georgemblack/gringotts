import { parse } from "papaparse";

import {
  C1CreditRecord,
  Transaction,
  Bool,
  Account,
  AppleCardCreditRecord,
  C1CheckingRecord,
} from "./Types";

// TODO: Add a way to validate CSV fields proir to converting

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
  return (
    transaction.amount !== "" ||
    transaction.amount === null ||
    transaction.amount === undefined
  );
}

/**
 * Convert raw CSV input to a list of transactions.
 */
export function csvToTransactions(
  csv: string,
  account: Account
): Transaction[] {
  let transactions: Transaction[] = [];

  // Parse Capital One credit CSV
  if (
    [Account.CAPITAL_ONE_SAVOR, Account.CAPITAL_ONE_QUICKSILVER].includes(
      account as Account
    )
  ) {
    const result = parse<C1CreditRecord>(csv.trim(), { header: true });
    transactions = c1CreditRecordsToTransactions(
      result.data,
      account as Account
    );
  }

  // Parse Capital One checking CSV
  if (account === Account.CAPITAL_ONE_CHECKING) {
    const result = parse<C1CheckingRecord>(csv.trim(), { header: true });
    transactions = c1CheckingRecordsToTransactions(
      result.data,
      account as Account
    );
  }

  // Parse Apple Card credit card CSV
  if (account === Account.APPLE_CARD) {
    const result = parse<AppleCardCreditRecord>(csv.trim(), { header: true });
    transactions = appleCardCreditRecordsToTransactions(
      result.data,
      account as Account
    );
  }

  return transactions;
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
    amount,
    credit,
    account,
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
 * Convert a record from a C1 checking account to a standard transaction.
 */
export function c1CheckingRecordToTransaction(
  record: C1CheckingRecord,
  account: Account
): Transaction {
  // Convert date from 'MM/DD/YYYY' to 'YYYY-MM-DD'
  const split = record["Transaction Date"].split("/");
  const date = `20${split[2]}-${split[0]}-${split[1]}`;

  // If amount is positive, it's a credit
  const credit =
    record["Transaction Amount"].startsWith("-") === true
      ? Bool.FALSE
      : Bool.TRUE;

  // Remove negative sign from amount if it's not a credit
  const amount =
    credit === Bool.TRUE
      ? record["Transaction Amount"]
      : record["Transaction Amount"].substring(1);

  return {
    key: generateRecordId(record),
    date,
    description: record["Transaction Description"],
    merchant: "",
    merchantCategory: "",
    category: "",
    amount,
    credit,
    account,
    notes: "",
    skipped: Bool.FALSE,
    reviewed: Bool.FALSE,
  };
}

export function c1CheckingRecordsToTransactions(
  records: C1CheckingRecord[],
  account: Account
): Transaction[] {
  return records.map((record) =>
    c1CheckingRecordToTransaction(record, account)
  );
}

/**
 * Convert a record from an Apple Card credit account to a standard transaction.
 */
export function appleCardCreditRecordToTransaction(
  record: AppleCardCreditRecord,
  account: Account
): Transaction {
  // Convert date from 'MM/DD/YYYY' to 'YYYY-MM-DD'
  const split = record["Transaction Date"].split("/");
  const date = `${split[2]}-${split[0]}-${split[1]}`;

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
    account,
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
