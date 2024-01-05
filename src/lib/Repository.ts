import Dexie from "dexie";

import { db } from "./DB";
import {
  Bool,
  Category,
  DBContents,
  Month,
  Rule,
  Summary,
  MonthSummary,
  Transaction,
  getMonthNumber,
  Groups,
  Group,
  DBResult,
} from "./Types";
import { validRule, validTransaction } from "./Validate";

// TODO: Validate all data at repository level
// TODO: Return objects with error and status info

export async function getMerchants(): Promise<string[]> {
  try {
    const result = await db.transactions
      .where("merchant")
      .notEqual("")
      .uniqueKeys();
    const merchants = result.map((key) => String(key));
    return merchants || [];
  } catch (error) {
    return [];
  }
}

export async function getMerchantCategories(): Promise<string[]> {
  try {
    const result = await db.transactions
      .where("merchantCategory")
      .notEqual("")
      .uniqueKeys();
    const categories = result.map((key) => String(key));
    return categories || [];
  } catch (error) {
    return [];
  }
}

export async function getRule(merchant: string): Promise<Rule | undefined> {
  try {
    const rules = await db.rules.where("merchant").equals(merchant).toArray();
    if (rules.length !== 1) return undefined;
    return rules[0];
  } catch (error) {
    return undefined;
  }
}

export async function getRules(): Promise<Rule[]> {
  try {
    const rules = await db.rules.toArray();
    return rules || [];
  } catch (error) {
    return [];
  }
}

export async function saveRule(rule: Rule): Promise<DBResult> {
  if (!validRule(rule)) {
    return {
      success: false,
      message: `Error saving rule: invalid rule`,
    };
  }

  try {
    await db.rules.add(rule);
  } catch (error) {
    return { success: false, message: `Error saving rule: ${error}` };
  }

  return { success: true, message: "Rule saved" };
}

export async function saveRules(rules: Rule[]): Promise<DBResult> {
  const invalid = rules.filter((r) => !validRule(r));
  if (invalid.length > 0) {
    return {
      success: false,
      message: `Error saving rules: ${invalid.length} rules are not valid`,
    };
  }

  try {
    await db.rules.bulkAdd(rules);
  } catch (error) {
    if (error instanceof Dexie.BulkError) {
      return {
        success: false,
        message: `Encountered ${
          error.failures.length
        } errors when saving rules: ${error.failures.join("; ")}`,
      };
    }
    return { success: false, message: `Error saving rules: ${error}` };
  }

  return { success: true, message: `${rules.length} rules saved` };
}

export async function deleteRule(id: number): Promise<void> {
  try {
    await db.rules.delete(id);
  } catch (error) {
    console.error(`Error deleting rule: ${error}`);
  }
}

/**
 * All filters allowed by getTransactions.
 */
export interface TransactionFilter {
  month?: number;
  year?: number;
  tag?: string;
  skipped?: boolean;
  reviewed?: boolean;
}

/**
 * Filters internally used by the database.
 */
interface DBTransactionFilter {
  month?: number;
  year?: number;
  skipped?: Bool.TRUE | Bool.FALSE;
  reviewed?: Bool.TRUE | Bool.FALSE;
}

/**
 * Fetches a list of transactions based on the given filters.
 * Not all filters can be passed via query, so we perform in-memory filtering afterwards.
 */
export async function getTransactions(
  filter: TransactionFilter
): Promise<Transaction[]> {
  const dbFilter: DBTransactionFilter = {};
  if (filter.month !== undefined) dbFilter.month = filter.month;
  if (filter.year !== undefined) dbFilter.year = filter.year;
  if (filter.skipped !== undefined)
    dbFilter.skipped = filter.skipped ? Bool.TRUE : Bool.FALSE;
  if (filter.reviewed !== undefined)
    dbFilter.reviewed = filter.reviewed ? Bool.TRUE : Bool.FALSE;

  try {
    const result = await db.transactions.where(dbFilter).toArray();
    const filtered = result.filter((t) => {
      if (!filter.tag) return true;
      return t.tags?.includes(filter.tag);
    });
    return filtered || [];
  } catch (error) {
    console.error(`Error getting transactions: ${error}`);
    return [];
  }
}

export async function saveTransaction(
  transaction: Transaction
): Promise<DBResult> {
  if (!validTransaction(transaction)) {
    return {
      success: false,
      message: `Error saving transaction: invalid transaction`,
    };
  }

  try {
    await db.transactions.add(transaction);
  } catch (error) {
    return { success: false, message: `Error saving transaction: ${error}` };
  }

  return { success: true, message: "Transaction saved" };
}

export async function saveTransactions(
  transactions: Transaction[]
): Promise<DBResult> {
  const invalid = transactions.filter((t) => !validTransaction(t));
  if (invalid.length > 0) {
    return {
      success: false,
      message: `Error saving transactions: ${invalid.length} transactions are not valid`,
    };
  }

  try {
    await db.transactions.bulkAdd(transactions);
  } catch (error) {
    if (error instanceof Dexie.BulkError) {
      return {
        success: false,
        message: `Encountered ${
          error.failures.length
        } errors when saving transactions: ${error.failures.join("; ")}`,
      };
    }
    return { success: false, message: `Error saving transactions: ${error}` };
  }

  return {
    success: true,
    message: `${transactions.length} transactions saved`,
  };
}

export async function updateTransaction(
  transaction: Transaction
): Promise<DBResult> {
  if (!transaction.id) {
    return {
      success: false,
      message: `Error updating transaction: no id`,
    };
  }
  if (!validTransaction(transaction)) {
    return {
      success: false,
      message: `Error updating transaction: invalid transaction`,
    };
  }

  try {
    await db.transactions.update(transaction.id, transaction);
  } catch (error) {
    return { success: false, message: `Error updating transaction: ${error}` };
  }

  return { success: true, message: "Transaction updated" };
}

export async function deleteTransaction(id: number): Promise<void> {
  try {
    await db.transactions.delete(id);
  } catch (error) {
    console.error(`Error deleting transaction: ${error}`);
  }
}

export async function getSummary(year: number): Promise<Summary> {
  const result: Summary = { items: [] };
  const transactions = await getTransactions({ year });

  for (const month of Object.values(Month)) {
    const newItem: MonthSummary = {
      month,
      categories: [],
      groups: [],
      totals: { income: 0, spending: 0, expected: 0 },
    };

    // Find all transactions for the given month
    const transactionsForMonth = transactions.filter((t) => {
      return t.month === getMonthNumber(month);
    });

    // Find total income and spending
    const income = transactionsForMonth
      .filter((t) => Groups[t.category as Category] === Group.INCOME)
      .reduce((acc, t) => acc + t.amount, 0);

    const spending = transactionsForMonth
      .filter((t) =>
        [Group.ESSENTIAL, Group.ELECTIVE].includes(
          Groups[t.category as Category]
        )
      )
      .reduce((acc, t) => acc + t.amount, 0);
    newItem.totals = {
      income,
      spending,
      expected: income * 0.2,
    };

    // Calculate total for each category
    Object.values(Category).forEach((category) => {
      const total = transactionsForMonth
        .filter((t) => t.category === category)
        .reduce((acc, t) => acc + t.amount, 0);
      newItem.categories.push({ category, total });
    });

    // Calculate total for each category group
    Object.values(Groups).forEach((group) => {
      const total = newItem.categories
        .filter((c) => Groups[c.category] === group)
        .reduce((acc, c) => acc + c.total, 0);
      newItem.groups.push({
        group,
        total,
        expected: expected(income, group),
      });
    });

    result.items.push(newItem);
  }

  return result;
}

function expected(total: number, group: Group): number {
  switch (group) {
    case Group.ESSENTIAL:
      return total * 0.5;
    case Group.ELECTIVE:
      return total * 0.3;
  }
  return 0;
}

export async function importDB(db: DBContents): Promise<DBResult> {
  const transactionResults = await saveTransactions(db.transactions);
  const ruleResults = await saveRules(db.rules);
  return {
    success: transactionResults.success && ruleResults.success,
    message: `${transactionResults.message}; ${ruleResults.message}`,
  };
}

export async function exportDB(): Promise<DBContents> {
  try {
    const rules = await db.rules.toArray();
    const transactions = await db.transactions.toArray();
    return { rules, transactions };
  } catch (error) {
    return {
      rules: [],
      transactions: [],
    };
  }
}
