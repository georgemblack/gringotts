import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

import ReviewForm from "../components/ReviewForm";
import { db } from "../lib/DB";
import { getMerchantCategories, getMerchants } from "../lib/Repository";
import { Bool } from "../lib/Types";

function Review() {
  const [merchants, setMerchants] = useState<string[]>([]);
  const [merchantCategories, setMerchantCategories] = useState<string[]>([]);

  const transactions =
    useLiveQuery(() =>
      db.transactions.where({ reviewed: Bool.FALSE }).toArray()
    ) || [];

  useEffect(() => {
    getMerchants().then(setMerchants);
    getMerchantCategories().then(setMerchantCategories);
  }, []);

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
