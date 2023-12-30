import { useState } from "react";

import { Bool, Transaction } from "../lib/Types";

function ReviewForm({ transaction }: { transaction: Transaction }) {
  const [merchant, setMerchant] = useState(transaction.merchant);
  const [merchantCategory, setMerchantCategory] = useState(
    transaction.merchantCategory
  );
  const [category, setCategory] = useState(transaction.category);
  const [credit, setCredit] = useState(transaction.credit);
  const [notes, setNotes] = useState(transaction.notes);

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="flex justify-between">
            <p>{transaction.date}</p>
            <p>${transaction.amount}</p>
          </div>
          <div>
            <p>{transaction.description}</p>
          </div>
          <form>
            <div className="flex gap-2">
              <input
                className="input"
                placeholder="Merchant"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
              />
              <input
                className="input"
                placeholder="Merchant Category"
                value={merchantCategory}
                onChange={(e) => setMerchantCategory(e.target.value)}
              />
            </div>
            <div className="mt-2 flex gap-2">
              <input
                className="input"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <input
                className="input"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={credit == Bool.TRUE ? true : false}
                  onChange={(e) => {
                    setCredit(e.target.checked ? Bool.TRUE : Bool.FALSE);
                  }}
                />
                Credit
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button className="button">Skip</button>
              <button type="submit" className="button is-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
