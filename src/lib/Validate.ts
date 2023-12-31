import {
  AppleCardCreditRecord,
  C1CheckingRecord,
  C1CreditRecord,
} from "./Types";

export function valid1CreditRecord(record: C1CreditRecord): boolean {
  return (
    record["Card No."] !== undefined &&
    record.Category !== undefined &&
    record.Credit !== undefined &&
    record.Debit !== undefined &&
    (record.Credit !== "" || record.Debit !== "") &&
    record.Description !== undefined &&
    record["Posted Date"] !== undefined &&
    record["Transaction Date"] !== undefined
  );
}

export function validC1CheckingRecord(record: C1CheckingRecord): boolean {
  return (
    record["Account Number"] !== undefined &&
    record["Transaction Date"] !== undefined &&
    record["Transaction Amount"] !== undefined &&
    record["Transaction Amount"] !== "" &&
    record["Transaction Type"] !== undefined &&
    record["Transaction Description"] !== undefined &&
    record.Balance !== undefined
  );
}

export function validAppleCardCreditRecord(
  record: AppleCardCreditRecord
): boolean {
  return (
    record["Transaction Date"] !== undefined &&
    record["Clearing Date"] !== undefined &&
    record.Description !== undefined &&
    record.Merchant !== undefined &&
    record.Category !== undefined &&
    record.Type !== undefined &&
    record["Amount (USD)"] !== undefined &&
    record["Amount (USD)"] !== "" &&
    record["Purchased By"] !== undefined
  );
}
