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
  PETS = "PETS",
  TRANSPORTATION = "TRANSPORTATION",
  ESSENTIAL_SERVICES = "ESSENTIAL_SERVICES",
  UTILITIES = "UTILITIES",
  AUTO_LOANS_MINIMUM = "AUTO_LOANS_MINIMUM",
  INSURANCE = "INSURANCE",
  ESSENTIAL_MISC = "ESSENTIAL_MISC",
  DINING_ENTERTAINMENT = "DINING_ENTERTAINMENT",
  SHOPPING = "SHOPPING",
  TRAVEL_TRIPS = "TRAVEL_TRIPS",
  SUBSCRIPTIONS = "SUBSCRIPTIONS",
  HOBBIES = "HOBBIES",
  ELECTIVE_SERVICES = "ELECTIVE_SERVICES",
  CHARITY = "CHARITY",
  GIFTS = "GIFTS",
  ELECTIVE_HIDDEN = "ELECTIVE_HIDDEN",
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
  [Category.PETS]: "Pets",
  [Category.TRANSPORTATION]: "Transportation",
  [Category.ESSENTIAL_SERVICES]: "Essential Services",
  [Category.UTILITIES]: "Utilities",
  [Category.AUTO_LOANS_MINIMUM]: "Auto Loans Minimum",
  [Category.INSURANCE]: "Insurance",
  [Category.ESSENTIAL_MISC]: "Essential Misc",
  [Category.DINING_ENTERTAINMENT]: "Dining & Entertainment",
  [Category.SHOPPING]: "Shopping",
  [Category.TRAVEL_TRIPS]: "Travel & Trips",
  [Category.SUBSCRIPTIONS]: "Subscriptions",
  [Category.HOBBIES]: "Hobbies",
  [Category.ELECTIVE_SERVICES]: "Elective Services",
  [Category.CHARITY]: "Charity",
  [Category.GIFTS]: "Gifts",
  [Category.ELECTIVE_HIDDEN]: "Cashidy",
};

export const MerchantCategoryMap = {
  Amazon: "Online Retailer",
  Backblaze: "Cloud Provider",
  Cloudflare: "Cloud Provider",
  "Capital One": "Bank",
  Chase: "Bank",
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

export interface DBContents {
  transactions: Transaction[];
}
