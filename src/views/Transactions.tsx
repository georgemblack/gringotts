import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import Currency from "../components/Currency";
import MonthFilter from "../components/MonthFilter";
import TagFilter from "../components/TagFilter";
import YearFilter from "../components/YearFilter";
import {
  TransactionFilter,
  deleteTransaction,
  getTransactions,
} from "../lib/Repository";
import {
  AccountNames,
  Category,
  CategoryNames,
  Month,
  Tag,
  getMonthNumber as monthNumber,
} from "../lib/Types";

function Transactions() {
  const [tag, setTag] = useState<Tag | "Any">("Any");
  const [month, setMonth] = useState<Month | "Any">("Any");
  const [year, setYear] = useState<number>(2024);

  const transactions =
    useLiveQuery(() => {
      let query: TransactionFilter = {
        year,
        skipped: false,
        reviewed: true,
      };

      // Optional query params
      if (month !== "Any") {
        query = { ...query, month: monthNumber(month) };
      }
      if (tag !== "Any") {
        query = { ...query, tag: tag };
      }

      return getTransactions(query);
    }, [month, year, tag]) || [];

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
  };

  const sorted = transactions.sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    if (a.day !== b.day) return a.day - b.day;
    return 0;
  });

  return (
    <main className="page-full-width">
      <div className="flex justify-end gap-2">
        <TagFilter value={tag} onSelect={setTag} />
        <MonthFilter value={month} onSelect={setMonth} />
        <YearFilter value={year} onSelect={setYear} />
      </div>
      <table className="table w-full mt-4 is-striped is-narrow">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Category</th>
            <th>Account</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {transaction.month}/{transaction.day}/{transaction.year}
              </td>
              <td>
                <Currency amount={transaction.amount} />
              </td>
              <td>
                {transaction.merchant} • {transaction.merchantCategory}
              </td>
              <td>{CategoryNames[transaction.category as Category]}</td>
              <td>{AccountNames[transaction.account]}</td>
              <td>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (transaction.id) handleDelete(transaction.id);
                  }}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Transactions;
