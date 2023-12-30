import { useState } from "react";
import * as React from "react";

import { updateTransaction } from "../lib/Repository";
import {
  AccountNames,
  Bool,
  Category,
  CategoryNames,
  Transaction,
} from "../lib/Types";
import Autosuggest from "./Autosuggest";

function ReviewForm({ transaction }: { transaction: Transaction }) {
  const [merchant, setMerchant] = useState(transaction.merchant);
  const [merchantCategory, setMerchantCategory] = useState(
    transaction.merchantCategory
  );
  const [category, setCategory] = useState(transaction.category);
  const [credit, setCredit] = useState(transaction.credit);
  const [notes, setNotes] = useState(transaction.notes);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (merchant === "" || merchantCategory === "" || category === "") return;

    updateTransaction({
      ...transaction,
      merchant,
      merchantCategory,
      category,
      credit,
      notes,
      reviewed: Bool.TRUE,
    });
  };

  const handleSkip = async (event: React.FormEvent) => {
    event.preventDefault();
    updateTransaction({
      ...transaction,
      skipped: Bool.TRUE,
      reviewed: Bool.TRUE,
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="flex justify-between font-mono">
            <p className="m-0">{transaction.date}</p>
            <p className="m-0">${transaction.amount}</p>
          </div>
          <div className="text-gray-400">
            <p className="m-0">
              {transaction.description}, {AccountNames[transaction.account]}
            </p>
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <Autosuggest
                value={merchant}
                suggestions={["one", "two", "three", "four", "apple", "banana"]}
                placeholder="Merchant"
                onChange={setMerchant}
              />
              <Autosuggest
                value={merchantCategory}
                suggestions={["one", "two", "three", "four", "apple", "banana"]}
                placeholder="Merchant Category"
                onChange={setMerchantCategory}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <Autosuggest
                value={category}
                suggestions={Object.keys(Category).map(
                  (key) => CategoryNames[key as Category]
                )}
                placeholder="Category"
                onChange={setCategory}
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
              <button type="button" className="button" onClick={handleSkip}>
                Skip
              </button>
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
