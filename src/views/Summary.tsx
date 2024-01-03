import { useEffect, useState } from "react";

import Currency from "../components/Currency";
import EmptyRow from "../components/EmptyRow";
import YearField from "../components/YearField";
import { getSummary } from "../lib/Repository";
import {
  Group,
  Groups,
  CategoryNames,
  Month,
  Summary,
  Category,
  MonthSummary,
} from "../lib/Types";

// TODO: Refactor a large amount of duplicate logic on this page

function Summary() {
  const [year, setYear] = useState<number>(2024);
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

  const groupTotalRow = (group: Group) => {
    const columns: JSX.Element[] = [];

    Object.values(Month).forEach(month => {
      const item = summary.items.find(item => item.month === month);
      const value = item?.groups.find(g => g.group === group);
      columns.push(<td><Currency amount={value?.total || 0} /></td>);
    });

    let classes = "font-bold bg-green-100"
    if(group === Group.ESSENTIAL) classes = "font-bold bg-pink-100";
    if(group === Group.ELECTIVE) classes = "font-bold bg-orange-100";
    if(group === Group.INVESTMENT) classes = "font-bold bg-blue-100";

    return <tr className={classes}>
      <td>Total</td>
      {columns}
    </tr>
  };

  const groupExpectedRow = (group: Group) => {
    const columns: JSX.Element[] = [];

    Object.values(Month).forEach(month => {
      const item = summary.items.find(item => item.month === month);
      const value = item?.groups.find(g => g.group === group);
      columns.push(<td><Currency amount={value?.expected || 0} /></td>);
    });

    return <tr className="bg-gray-100">
      <td>Expected</td>
      {columns}
    </tr>
  }

  const totalRows = () => {
    const rows: JSX.Element[] = [];
    const items: MonthSummary[] = [];

    Object.values(Month).forEach(month => {
      const item = summary.items.find(item => item.month === month);
      if(item) items.push(item);
    });

    // Create a row with total income
    let columns: JSX.Element[] = [];
    items.forEach(item => {
      columns.push(<td><Currency amount={item.totals.income} /></td>);
    });
    rows.push(<tr><td>Income</td>{columns}</tr>)

    // Create a row with total spending
    columns = [];
    items.forEach(item => {
      columns.push(<td><Currency amount={item.totals.spending} /></td>);
    });
    rows.push(<tr><td>Spending</td>{columns}</tr>)

    // Create a row with take-home
    columns = [];
    items.forEach(item => {
      columns.push(<td><Currency amount={item.totals.income - item.totals.spending} /></td>);
    });
    rows.push(<tr className="font-bold bg-emerald-300"><td>Take Home</td>{columns}</tr>)

    // Create a row with expected take-home
    columns = [];
    items.forEach(item => {
      columns.push(<td><Currency amount={item.totals.expected} /></td>);
    });
    rows.push(<tr className="bg-gray-100"><td>Expected</td>{columns}</tr>)

    return rows;
  }

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
          {groupTotalRow(Group.INCOME)}
          <EmptyRow cols={13} />
          {rows(Group.ESSENTIAL)}
          {groupTotalRow(Group.ESSENTIAL)}
          {groupExpectedRow(Group.ESSENTIAL)}
          <EmptyRow cols={13} />
          {rows(Group.ELECTIVE)}
          {groupTotalRow(Group.ELECTIVE)}
          {groupExpectedRow(Group.ELECTIVE)}
          <EmptyRow cols={13} />
          {rows(Group.INVESTMENT)}
          {groupTotalRow(Group.INVESTMENT)}
          <EmptyRow cols={13} />
          {totalRows()}
        </tbody>
      </table>
    </main>
  );
}
export default Summary;
