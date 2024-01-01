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
  [Account.VENMO]: "Venmo",
};

export enum Category {
  COMPENSATION = "COMPENSATION",
  BANKING_REWARDS = "BANKING_REWARDS",
  INCOME_MISC = "INCOME_MISC",
  HEALTH = "HEALTH",
  HOUSING = "HOUSING",
  EDUCATION = "EDUCATION",
  GROCERIES = "GROCERIES",
  SUPPLIES = "SUPPLIES",
  TRANSPORTATION = "TRANSPORTATION",
  UTILITIES = "UTILITIES",
  AUTO_LOANS_MINIMUM = "AUTO_LOANS_MINIMUM",
  INSURANCE = "INSURANCE",
  ESSENTIAL_SERVICES = "ESSENTIAL_SERVICES",
  ESSENTIAL_MISC = "ESSENTIAL_MISC",
  DINING_ENTERTAINMENT = "DINING_ENTERTAINMENT",
  SHOPPING = "SHOPPING",
  TRIPS_TRAVEL = "TRIPS_TRAVEL",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  HOBBIES = "HOBBIES",
  CHARITY = "CHARITY",
  GIFTS = "GIFTS",
  ELECTIVE_SERVICES = "ELECTIVE_SERVICES",
  ELECTIVE_MISC = "ELECTIVE_MISC",
  ELECTIVE_HIDDEN = "ELECTIVE_HIDDEN",
  GENERAL_FUND_INVESTMENT = "GENERAL_FUND_INVESTMENT",
  PROJECT_FUND_INVESTMNET = "PROJECT_FUND_INVESTMNET",
  PRIVATE_FUND_INVESTMENT = "PRIVATE_FUND_INVESTMENT",
  AUTO_LOANS_EXTRA = "AUTO_LOANS_EXTRA",
}

export const CategoryNames = {
  [Category.COMPENSATION]: "Compensation",
  [Category.BANKING_REWARDS]: "Banking Rewards",
  [Category.INCOME_MISC]: "Income Misc",
  [Category.HEALTH]: "Health",
  [Category.HOUSING]: "Housing",
  [Category.EDUCATION]: "Education",
  [Category.GROCERIES]: "Groceries",
  [Category.SUPPLIES]: "Supplies",
  [Category.TRANSPORTATION]: "Transportation",
  [Category.UTILITIES]: "Utilities",
  [Category.AUTO_LOANS_MINIMUM]: "Auto Loans Minimum",
  [Category.INSURANCE]: "Insurance",
  [Category.ESSENTIAL_SERVICES]: "Essential Services",
  [Category.ESSENTIAL_MISC]: "Essential Misc",
  [Category.DINING_ENTERTAINMENT]: "Dining & Entertainment",
  [Category.SHOPPING]: "Shopping",
  [Category.TRIPS_TRAVEL]: "Trips & Travel",
  [Category.SUBSCRIPTIONS]: "Subscriptions",
  [Category.HOBBIES]: "Hobbies",
  [Category.CHARITY]: "Charity",
  [Category.GIFTS]: "Gifts",
  [Category.ELECTIVE_SERVICES]: "Elective Services",
  [Category.ELECTIVE_MISC]: "Elective Misc",
  [Category.ELECTIVE_HIDDEN]: "Elective Hidden",
  [Category.GENERAL_FUND_INVESTMENT]: "General Fund Investment",
  [Category.PROJECT_FUND_INVESTMNET]: "Project Fund Investment",
  [Category.PRIVATE_FUND_INVESTMENT]: "Private Fund Investment",
  [Category.AUTO_LOANS_EXTRA]: "Auto Loans Extra",
};

/**
 * Given a category name (e.g. "Dining & Entertainment"), return the proper category (e.g. "DINING_ENTERTAINMENT").
 */
export function getProperCategory(category: string): Category | null {
  for (const [key, value] of Object.entries(CategoryNames)) {
    if (value === category) return key as Category;
  }
  return null;
}

export interface Transaction {
  id?: number;
  key: string;
  day: number;
  month: number;
  year: number;
  amount: string;
  credit: Bool.FALSE | Bool.TRUE;
  merchant: string;
  merchantCategory: string;
  category: string;
  account: Account;
  description: string;
  notes: string;
  skipped: Bool.FALSE | Bool.TRUE;
  reviewed: Bool.FALSE | Bool.TRUE;
}

export interface Rule {
  id?: number;
  merchant: string;
  merchantCategory: string;
  category: string;
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

export interface C1CheckingRecord {
  "Account Number": string;
  "Transaction Date": string;
  "Transaction Amount": string;
  "Transaction Type": string;
  "Transaction Description": string;
  Balance: string;
}

export interface AppleCardCreditRecord {
  "Transaction Date": string;
  "Clearing Date": string;
  Description: string;
  Merchant: string;
  Category: string;
  Type: string;
  "Amount (USD)": string;
  "Purchased By": string;
}

export interface AppleCardSavingsRecord {
  "Transaction Date": string;
  "Posted Date": string;
  "Activity Type": string;
  "Transaction Type": string;
  Description: string;
  "Currency Code": string;
  Amount: string;
}

export interface DBContents {
  rules: Rule[];
  transactions: Transaction[];
}
