import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import ReviewForm from "../components/ReviewForm";
import {
  getMerchantCategories,
  getMerchants,
  getTransactions,
} from "../lib/Repository";

function Review() {
  const [amount, setAmount] = useState<string>("");

  const merchants = useLiveQuery(getMerchants);
  const merchantCategories = useLiveQuery(getMerchantCategories);
  const transactions =
    useLiveQuery(() => getTransactions({ reviewed: false })) || [];

  const filtered = transactions.filter((transaction) => {
    if (amount === "") return true;
    return transaction.amount === Number(amount);
  });

  return (
    <main className="page-standard-width">
      <div className="flex items-center justify-end gap-1">
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
            merchants={merchants || []}
            merchantCategories={merchantCategories || []}
          />
        </div>
      ))}
    </main>
  );
}

export default Review;
