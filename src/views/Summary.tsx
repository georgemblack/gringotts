import { useEffect, useState } from "react";

import Currency from "../components/Currency";
import { getSummary } from "../lib/Repository";
import { CategoryNames, Month, TransactionSummary } from "../lib/Types";

function Summary() {
  const [summary, setSummary] = useState<TransactionSummary>({ items: [] });

  useEffect(() => {
    getSummary(2023).then((result) => setSummary(result));
  }, []);

  return (
    <table className="table mt-4 w-full is-narrow">
      <thead>
        <tr>
          <th></th>
          {Object.values(Month).map((month) => (
            <th>{month}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {summary.items.map((item) => {
          return (
            <tr key={item.category}>
              <td>{CategoryNames[item.category]}</td>
              {item.values.map((value) => {
                return (
                  <td>
                    <Currency amount={value.total} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Summary;
