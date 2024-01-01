import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Autosuggest from "../components/Autosuggest";
import CategoryField from "../components/CategoryField";
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
  const [merchant, setMerchant] = useState<string>("");
  const [merchantCategory, setMerchantCategory] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [account, setAccount] = useState(Account.CAPITAL_ONE_QUICKSILVER);

  useEffect(() => {
    getMerchants().then(setMerchants);
    getMerchantCategories().then(setMerchantCategories);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (merchant === "" || merchantCategory === "" || category === null) return;

    const message = await saveTransaction({
      key: uuidv4(),
      day: Number(date.split("/")[1]),
      month: Number(date.split("/")[0]),
      year: Number(date.split("/")[2]),
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
    setCategory(null);
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
            placeholder="Date (i.e. 4/26/2024)"
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
        <div className="mt-4 flex justify-between">
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
