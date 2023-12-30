import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/DB";

function Transactions() {
  const transactions = useLiveQuery(() => db.transactions.toArray()) || [];

  return (
    <div>
      <table className="table">
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
