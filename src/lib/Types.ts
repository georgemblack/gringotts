export enum Bool {
  TRUE = 1,
  FALSE = 0,
}

export enum Account {
  CAPITAL_ONE_SAVOR = "CAPITAL_ONE_SAVOR",
  CAPITAL_ONE_QUICKSILVER = "CAPITAL_ONE_QUICKSILVER",
  CAPITAL_ONE_CHECKING = "CAPITAL_ONE_CHECKING",
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
  Account: Account;
  Notes: string;
  Skipped: Bool.FALSE | Bool.TRUE;
}

export interface C1CreditRecord {
  "Card No.": string;
  Category: string;
  Credit: string;
  Debit: string;
  Description: string;
  "Posted Date": string;
  "Transaction Date": string;
}
