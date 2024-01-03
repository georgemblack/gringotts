import { useEffect, useState } from "react";

import Currency from "../components/Currency";
import EmptyRow from "../components/EmptyRow";
import GroupTotalRow from "../components/GroupTotalRow";
import YearField from "../components/YearField";
import { getSummary } from "../lib/Repository";
import {
  Group,
  Groups,
  CategoryNames,
  Month,
  Summary,
  MonthSummary,
  Category,
} from "../lib/Types";

function Summary() {
  const [year, setYear] = useState<number>(2023);
  const [summary, setSummary] = useState<Summary>({ items: [] });

  /**
   * Generate a set of rows for a given group.
   * Summary data is categorized by month. Each row requires data from each month.
   */
  const rows = (group: Group) => {
    const categories = Object.values(Category).filter(c => Groups[c] === group);

    // For each category, create a row
    const rows = categories.map((category) => {
      const columns: JSX.Element[] = [];

      // Add column cell for each month
      Object.values(Month).forEach(month => {
        const item = summary.items.find(item => item.month === month);
        const value = item?.categories.find(c => c.category === category);
        columns.push(<td><Currency amount={value?.total || 0} /></td>);
      })

      return <tr>
        <td>{CategoryNames[category]}</td>
        {columns}
      </tr>
    });

    return rows;
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
          {rows(Group.INCOME)}
          <EmptyRow cols={13} />

          {rows(Group.ESSENTIAL)}
          <EmptyRow cols={13} />
          {rows(Group.ELECTIVE)}
          <EmptyRow cols={13} />
          {rows(Group.INVESTMENT)}
        </tbody>
      </table>
    </main>
  );
}
export default Summary;
