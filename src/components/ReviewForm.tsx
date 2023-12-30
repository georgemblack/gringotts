import { Transaction } from "../lib/Types";

function ReviewForm({ transaction }: { transaction: Transaction }) {
  return (
    <div className="border p-4 rounded-xl">
      <div>
        <input className="input" value={transaction.merchant} />
      </div>
      <div className="mt-2">
        <input className="input" value={transaction.category} />
      </div>
    </div>
  );
}

export default ReviewForm;
