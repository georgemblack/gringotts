import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Autosuggest from "../components/Autosuggest";
import {
  getMerchantCategories,
  getMerchants,
  saveTransaction,
} from "../lib/Repository";
import {
  Account,
  AccountNames,
  Bool,
  Category,
  CategoryNames,
} from "../lib/Types";

function Add() {
  const [merchants, setMerchants] = useState<string[]>([]);
  const [merchantCategories, setMerchantCategories] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [merchant, setMerchant] = useState("");
  const [merchantCategory, setMerchantCategory] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [account, setAccount] = useState(Account.CAPITAL_ONE_QUICKSILVER);

  useEffect(() => {
    getMerchants().then(setMerchants);
    getMerchantCategories().then(setMerchantCategories);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const message = await saveTransaction({
      key: uuidv4(),
      date,
      description: "Manually created",
      merchant,
      merchantCategory,
      category,
      amount,
      credit: Bool.FALSE,
      account,
      notes,
      skipped: Bool.FALSE,
      reviewed: Bool.TRUE,
    });
    setStatusMessage(message);
    setAmount("");
    setDate("");
    setMerchant("");
    setMerchantCategory("");
    setCategory("");
    setNotes("");
  };

  return (
    <>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 mt-4">
          <input
            className="input"
            placeholder="Amount (i.e. 12.34)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            className="input"
            placeholder="Date (i.e. 2024-04-26)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1">
            <Autosuggest
              value={merchant}
              suggestions={merchants}
              placeholder="Merchant"
              onChange={setMerchant}
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
        <div className="mt-2 flex justify-between">
          <div className="select">
            <select
              onChange={(e) => {
                setAccount(e.target.value as Account);
              }}
              value={account}
            >
              {Object.keys(Account).map((key) => (
                <option key={key} value={key}>
                  {AccountNames[key as Account]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button is-primary">
            Save
          </button>
        </div>
      </form>
      <div className="mt-2">{statusMessage && <p>{statusMessage}</p>}</div>
    </>
  );
}

export default Add;
