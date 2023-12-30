import { useState } from "react";
import * as React from "react";

import { updateTransaction } from "../lib/Repository";
import {
  AccountNames,
  Bool,
  Category,
  CategoryNames,
  MerchantCategoryMap,
  Transaction,
} from "../lib/Types";
import Autosuggest from "./Autosuggest";

function ReviewForm({
  transaction,
  merchants,
  merchantCategories,
}: {
  transaction: Transaction;
  merchants: string[];
  merchantCategories: string[];
}) {
  const [merchant, setMerchant] = useState(transaction.merchant);
  const [merchantCategory, setMerchantCategory] = useState(
    transaction.merchantCategory
  );
  const [category, setCategory] = useState(transaction.category);
  const [notes, setNotes] = useState(transaction.notes);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (merchant === "" || merchantCategory === "" || category === "") return;

    updateTransaction({
      ...transaction,
      merchant,
      merchantCategory,
      category,
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
            {(() => {
              const split = transaction.date.split("-");
              return (
                <p className="m-0">
                  {split[1]}/{split[2]}/{split[0]}
                </p>
              );
            })()}
            <p className={transaction.credit ? "mt-0 bg-green-300" : "mt-0"}>
              ${transaction.amount}
            </p>
          </div>
          <div className="text-gray-400">
            <p className="m-0">
              {transaction.description}, {AccountNames[transaction.account]}
            </p>
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <div className="flex-1">
                <Autosuggest
                  value={merchant}
                  suggestions={merchants}
                  placeholder="Merchant"
                  onChange={(merchant) => {
                    if (Object.keys(MerchantCategoryMap).includes(merchant)) {
                      setMerchantCategory(
                        MerchantCategoryMap[
                          merchant as keyof typeof MerchantCategoryMap
                        ]
                      );
                    }
                    setMerchant(merchant);
                  }}
                />
              </div>
              <div className="flex-1">
                <Autosuggest
                  value={merchantCategory}
                  suggestions={merchantCategories}
                  placeholder="Merchant Category"
                  onChange={setMerchantCategory}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex-1">
                <Autosuggest
                  value={category}
                  suggestions={Object.keys(Category).map(
                    (key) => CategoryNames[key as Category]
                  )}
                  placeholder="Category"
                  onChange={setCategory}
                />
              </div>
              <div className="flex-1">
                <input
                  className="input"
                  placeholder="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
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
