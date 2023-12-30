import { useLiveQuery } from "dexie-react-hooks";

import ReviewForm from "../components/ReviewForm";
import { db } from "../lib/DB";
import { Bool } from "../lib/Types";

function Review() {
  const transactions =
    useLiveQuery(() =>
      db.transactions.where({ reviewed: Bool.FALSE }).toArray()
    ) || [];

  return (
    <div>
      {transactions.map((transaction) => (
        <div className="mt-4" key={transaction.id}>
          <ReviewForm transaction={transaction} />
        </div>
      ))}
    </div>
  );
}

export default Review;
