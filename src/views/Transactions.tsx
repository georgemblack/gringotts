import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/DB";
import { AccountNames, Bool } from "../lib/Types";

function Transactions() {
  const transactions =
    useLiveQuery(() =>
      db.transactions
        .where({ reviewed: Bool.TRUE, skipped: Bool.FALSE })
        .toArray()
    ) || [];

  return (
    <div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Merchant Category</th>
            <th>Category</th>
            <th>Account</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.merchant}</td>
              <td>{transaction.merchantCategory}</td>
              <td>{transaction.category}</td>
              <td>{AccountNames[transaction.account]}</td>
              <td>{transaction.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
