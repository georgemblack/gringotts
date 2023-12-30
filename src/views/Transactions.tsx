import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/DB";
import { Bool } from "../lib/Types";

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
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.date}</td>
              <td>{transaction.merchant}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
