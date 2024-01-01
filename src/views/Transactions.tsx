import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/DB";
import { deleteTransaction } from "../lib/Repository";
import { AccountNames, Bool, Category, CategoryNames } from "../lib/Types";

// TODO: Add button to delete transaction
// TODO: Add filters for month/year

function Transactions() {
  const transactions =
    useLiveQuery(() =>
      db.transactions
        .where({ reviewed: Bool.TRUE, skipped: Bool.FALSE })
        .toArray()
    ) || [];

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
  };

  return (
    <div>
      <table className="table w-full is-striped is-narrow">
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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {transaction.month}/{transaction.day}/{transaction.year}
              </td>
              <td>${transaction.amount}</td>
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
    </div>
  );
}

export default Transactions;
