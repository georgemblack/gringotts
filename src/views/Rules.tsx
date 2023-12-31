import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import { db } from "../lib/DB";
import { saveRule } from "../lib/Repository";

function Rules() {
  const rules = useLiveQuery(() => db.rules.toArray()) || [];

  const [merchant, setMerchant] = useState("");
  const [merchantCategory, setMerchantCategory] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveRule({
      merchant,
      merchantCategory,
      category,
    });
    setMerchant("");
    setMerchantCategory("");
    setCategory("");
  };

  const handleDelete = async (id: number) => {
    await db.rules.delete(id);
  };

  return (
    <>
      <table className="table w-full mt-4">
        <thead>
          <tr>
            <th>Merchant</th>
            <th>Merchant Category</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.merchant}</td>
              <td>{rule.merchantCategory}</td>
              <td>{rule.category}</td>
              <td className="flex justify-end">
                <button
                  onClick={() => {
                    if (rule.id) handleDelete(rule.id);
                  }}
                  className="button is-danger is-small is-light"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <div className="grow">
                  <input
                    className="input"
                    placeholder="Merchant"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                  />
                </div>
                <div className="grow">
                  <input
                    className="input"
                    placeholder="Merchant Category"
                    value={merchantCategory}
                    onChange={(e) => setMerchantCategory(e.target.value)}
                  />
                </div>
                <div className="grow">
                  <input
                    className="input"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <button type="submit" className="button is-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rules;
