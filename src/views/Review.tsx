import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import ReviewForm from "../components/ReviewForm";
import { db } from "../lib/DB";
import { Bool } from "../lib/Types";

// TODO: Add card number to transaction (or identifying person)

function Review() {
  const [amount, setAmount] = useState<string>("");

  const merchants =
    useLiveQuery(async () => {
      const result = await db.transactions
        .where("merchant")
        .notEqual("")
        .uniqueKeys();
      return result.map((key) => String(key));
    }) || [];

  const merchantCategories =
    useLiveQuery(async () => {
      const result = await db.transactions
        .where("merchantCategory")
        .notEqual("")
        .uniqueKeys();
      return result.map((key) => String(key));
    }) || [];

  const transactions =
    useLiveQuery(() =>
      db.transactions.where({ reviewed: Bool.FALSE }).toArray(),
    ) || [];

  const filtered = transactions.filter((transaction) => {
    if (amount === "") return true;
    return transaction.amount === Number(amount);
  });

  return (
    <main className="page-standard-width">
      <div className="flex gap-1 items-center justify-end">
        <span>💲</span>
        <div className="max-w-28">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="input"
          ></input>
        </div>
      </div>
      {filtered.length === 0 && <p>No transactions to review</p>}
      {filtered.map((transaction) => (
        <div className="mt-4" key={transaction.id}>
          <ReviewForm
            transaction={transaction}
            merchants={merchants}
            merchantCategories={merchantCategories}
          />
        </div>
      ))}
    </main>
  );
}

export default Review;
