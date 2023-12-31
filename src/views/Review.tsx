import { useLiveQuery } from "dexie-react-hooks";

import ReviewForm from "../components/ReviewForm";
import { db } from "../lib/DB";
import { Bool } from "../lib/Types";

// TODO: Add support for tagging
// TODO: Add support for filtering by account

function Review() {
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
      db.transactions.where({ reviewed: Bool.FALSE }).toArray()
    ) || [];

  return (
    <div>
      {transactions.length === 0 && <p>No transactions to review</p>}
      {transactions.map((transaction) => (
        <div className="mt-4" key={transaction.id}>
          <ReviewForm
            transaction={transaction}
            merchants={merchants}
            merchantCategories={merchantCategories}
          />
        </div>
      ))}
    </div>
  );
}

export default Review;
