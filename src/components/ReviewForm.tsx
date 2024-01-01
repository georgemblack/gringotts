import { useState } from "react";
import * as React from "react";

import { getRule, saveRule, updateTransaction } from "../lib/Repository";
import {
  AccountNames,
  Bool,
  Category,
  CategoryNames,
  Transaction,
} from "../lib/Types";
import Autosuggest from "./Autosuggest";
import CategoryField from "./CategoryField";

function ReviewForm({
  transaction,
  merchants,
  merchantCategories,
}: {
  transaction: Transaction;
  merchants: string[];
  merchantCategories: string[];
}) {
  const [merchant, setMerchant] = useState<string>(transaction.merchant);
  const [merchantCategory, setMerchantCategory] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);
  const [notes, setNotes] = useState<string>(transaction.notes);

  const [ruleCreated, setRuleCreated] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (merchant === "" || merchantCategory === "" || category === null) return;

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
            <p className="m-0">
              {transaction.month}/{transaction.day}/{transaction.year}
            </p>
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
                  onChange={async (merchant) => {
                    setMerchant(merchant);

                    // If there is a rule associated with this merchant, autofill 'merchantCategory' and 'category' as well
                    const rule = await getRule(merchant);
                    if (rule) {
                      setMerchantCategory(rule.merchantCategory);
                      setCategory(rule.category as Category);
                    }
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
                <CategoryField value={category} onSelect={setCategory} />
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
            <div className="flex justify-between mt-4">
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  className="button is-disabled"
                  onClick={async () => {
                    if (
                      merchant === "" ||
                      merchantCategory === "" ||
                      category === null
                    )
                      return;
                    await saveRule({
                      merchant,
                      merchantCategory,
                      category,
                    });
                    setRuleCreated(true);
                  }}
                  disabled={ruleCreated}
                >
                  Create Rule
                </button>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="button" onClick={handleSkip}>
                  Skip
                </button>
                <button type="submit" className="button is-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
