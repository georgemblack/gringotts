import { useLiveQuery } from "dexie-react-hooks";

import { deleteRule, getRules } from "../lib/Repository";
import { Category, CategoryNames } from "../lib/Types";

function Rules() {
  const rules = useLiveQuery(getRules) || [];

  const handleDelete = async (id: number) => {
    await deleteRule(id);
  };

  return (
    <main className="page-standard-width">
      <table className="table w-full mt-4 is-striped is-narrow">
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
              <td>{CategoryNames[rule.category as Category]}</td>
              <td className="flex justify-end">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (rule.id) handleDelete(rule.id);
                  }}
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Rules;
