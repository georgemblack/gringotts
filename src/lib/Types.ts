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
}

export const AccountNames = {
  [Account.CAPITAL_ONE_SAVOR]: "Capital One Savor",
  [Account.CAPITAL_ONE_QUICKSILVER]: "Capital One Quicksilver",
  [Account.CAPITAL_ONE_CHECKING]: "Capital One Checking",
  [Account.APPLE_CARD]: "Apple Card",
  [Account.APPLE_SAVINGS]: "Apple Savings",
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

export enum CategoryGroup {
  INCOME = "INCOME",
  ESSENTIAL = "ESSENTIAL",
  ELECTIVE = "ELECTIVE",
  INVESTMENT = "INVESTMENT",
}

export const CategoryGroupNames = {
  [CategoryGroup.INCOME]: "Income",
  [CategoryGroup.ESSENTIAL]: "Essential",
  [CategoryGroup.ELECTIVE]: "Elective",
  [CategoryGroup.INVESTMENT]: "Investment",
};

export const CategoryGroups = {
  [Category.COMPENSATION]: CategoryGroup.INCOME,
  [Category.BANKING_REWARDS]: CategoryGroup.INCOME,
  [Category.INCOME_MISC]: CategoryGroup.INCOME,
  [Category.HEALTH]: CategoryGroup.ESSENTIAL,
  [Category.HOUSING]: CategoryGroup.ESSENTIAL,
  [Category.EDUCATION]: CategoryGroup.ESSENTIAL,
  [Category.GROCERIES]: CategoryGroup.ESSENTIAL,
  [Category.SUPPLIES]: CategoryGroup.ESSENTIAL,
  [Category.TRANSPORTATION]: CategoryGroup.ESSENTIAL,
  [Category.UTILITIES]: CategoryGroup.ESSENTIAL,
  [Category.AUTO_LOANS_MINIMUM]: CategoryGroup.ESSENTIAL,
  [Category.INSURANCE]: CategoryGroup.ESSENTIAL,
  [Category.ESSENTIAL_SERVICES]: CategoryGroup.ESSENTIAL,
  [Category.ESSENTIAL_MISC]: CategoryGroup.ESSENTIAL,
  [Category.DINING_ENTERTAINMENT]: CategoryGroup.ELECTIVE,
  [Category.SHOPPING]: CategoryGroup.ELECTIVE,
  [Category.TRIPS_TRAVEL]: CategoryGroup.ELECTIVE,
  [Category.SUBSCRIPTIONS]: CategoryGroup.ELECTIVE,
  [Category.HOBBIES]: CategoryGroup.ELECTIVE,
  [Category.CHARITY]: CategoryGroup.ELECTIVE,
  [Category.GIFTS]: CategoryGroup.ELECTIVE,
  [Category.ELECTIVE_SERVICES]: CategoryGroup.ELECTIVE,
  [Category.ELECTIVE_MISC]: CategoryGroup.ELECTIVE,
  [Category.ELECTIVE_HIDDEN]: CategoryGroup.ELECTIVE,
  [Category.GENERAL_FUND_INVESTMENT]: CategoryGroup.INVESTMENT,
  [Category.PROJECT_FUND_INVESTMNET]: CategoryGroup.INVESTMENT,
  [Category.PRIVATE_FUND_INVESTMENT]: CategoryGroup.INVESTMENT,
  [Category.AUTO_LOANS_EXTRA]: CategoryGroup.INVESTMENT,
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

export enum Month {
  JANUARY = "January",
  FEBRUARY = "February",
  MARCH = "March",
  APRIL = "April",
  MAY = "May",
  JUNE = "June",
  JULY = "July",
  AUGUST = "August",
  SEPTEMBER = "September",
  OCTOBER = "October",
  NOVEMBER = "November",
  DECEMBER = "December",
}

export function getMonthNumber(month: Month): number {
  return Object.values(Month).indexOf(month) + 1;
}

export interface Transaction {
  id?: number;
  key: string;
  day: number;
  month: number;
  year: number;
  amount: number;
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

export interface TransactionSummary {
  items: TransactionSummaryItem[];
}

export interface TransactionSummaryItem {
  category: Category;
  values: { month: Month; total: number }[];
}

export interface DBResult {
  success: boolean;
  message: string;
}

export interface DBContents {
  rules: Rule[];
  transactions: Transaction[];
}
