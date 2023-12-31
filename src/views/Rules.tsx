import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../lib/DB";
import { deleteRule } from "../lib/Repository";

function Rules() {
  const rules = useLiveQuery(() => db.rules.toArray()) || [];

  const handleDelete = async (id: number) => {
    await deleteRule(id);
  };

  return (
    <>
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
              <td>{rule.category}</td>
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
    </>
  );
}

export default Rules;
