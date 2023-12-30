export enum Bool {
  TRUE = 1,
  FALSE = 0,
}

export enum Account {
  CAPITAL_ONE_SAVOR = "CAPITAL_ONE_SAVOR",
  CAPITAL_ONE_QUICKSILVER = "CAPITAL_ONE_QUICKSILVER",
  CAPITAL_ONE_CHECKING = "CAPITAL_ONE_CHECKING",
  APPLE_CARD = "APPLE_CARD",
  APPLE_SAVINGS = "APPLE_SAVINGS",
  CASH_APP = "CASH_APP",
  VENMO = "VENMO",
}

export const AccountNames = {
  [Account.CAPITAL_ONE_SAVOR]: "Capital One Savor",
  [Account.CAPITAL_ONE_QUICKSILVER]: "Capital One Quicksilver",
  [Account.CAPITAL_ONE_CHECKING]: "Capital One Checking",
  [Account.APPLE_CARD]: "Apple Card",
  [Account.APPLE_SAVINGS]: "Apple Savings",
  [Account.CASH_APP]: "Cash App",
};

export interface Transaction {
  id?: number;
  key: string;
  date: string;
  description: string;
  merchant: string;
  merchantCategory: string;
  category: string;
  amount: string;
  credit: Bool.FALSE | Bool.TRUE;
  account: Account;
  notes: string;
  skipped: Bool.FALSE | Bool.TRUE;
  reviewed: Bool.FALSE | Bool.TRUE;
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
