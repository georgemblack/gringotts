import { useEffect, useState } from "react";

import Currency from "../components/Currency";
import EmptyRow from "../components/EmptyRow";
import GroupTotalRow from "../components/GroupTotalRow";
import YearField from "../components/YearField";
import { getSummary } from "../lib/Repository";
import {
  CategoryGroup,
  CategoryGroups,
  CategoryNames,
  Month,
  TransactionSummary,
  TransactionSummaryItem,
} from "../lib/Types";

function Summary() {
  const [year, setYear] = useState<number>(2023);
  const [summary, setSummary] = useState<TransactionSummary>({ items: [] });

  /**
   * Generate sets for each category group, i.e. 'Income', 'Essential', etc.
   */
  const incomeGroup = summary.items.filter(
    (row) => CategoryGroups[row.category] === CategoryGroup.INCOME
  );
  const essentialGroup = summary.items.filter(
    (row) => CategoryGroups[row.category] === CategoryGroup.ESSENTIAL
  );
  const electiveGroup = summary.items.filter(
    (row) => CategoryGroups[row.category] === CategoryGroup.ELECTIVE
  );
  const investmentGroup = summary.items.filter(
    (row) => CategoryGroups[row.category] === CategoryGroup.INVESTMENT
  );

  /**
   * Generate rows for a given set of summary items.
   */
  const rows = (items: TransactionSummaryItem[]): JSX.Element[] => {
    return items.map((item) => {
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
    });
  };

  useEffect(() => {
    getSummary(year).then((result) => setSummary(result));
  }, [year]);

  return (
    <main className="page-full-width">
      <div className="flex gap-2 justify-end">
        <YearField value={year} onSelect={setYear} />
      </div>
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
          {/* Income group */}
          {rows(incomeGroup)}
          <GroupTotalRow items={incomeGroup} color="green" />
          <EmptyRow cols={13} />

          {/* Essential group */}
          {rows(essentialGroup)}
          <GroupTotalRow items={essentialGroup} color="blue" />
          <EmptyRow cols={13} />

          {/* Elective group */}
          {rows(electiveGroup)}
          <GroupTotalRow items={electiveGroup} color="orange" />
          <EmptyRow cols={13} />

          {/* Investment group */}
          {rows(investmentGroup)}
          <GroupTotalRow items={investmentGroup} color="violet" />
          <EmptyRow cols={13} />
        </tbody>
      </table>
    </main>
  );
}
export default Summary;
