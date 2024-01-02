import { Month, TransactionSummaryItem } from "../lib/Types";
import Currency from "./Currency";

interface GroupTotal {
  month: Month;
  amount: number;
}

function GroupTotalRow({
  items,
  color,
}: {
  items: TransactionSummaryItem[];
  color: "green" | "blue" | "orange" | "violet";
}) {
  const totals: GroupTotal[] = [];

  // For each month, create a 'total' for that given month
  Object.values(Month).forEach((month) => {
    const total: GroupTotal = { month, amount: 0 };

    // Feach item, find the value for the given month, and add it to the sum
    items.forEach((item) => {
      const value = item.values.find((value) => value.month === month);
      if (value) {
        total.amount += value.total;
      }
    });

    totals.push(total);
  });

  const getClassNames = () => {
    switch (color) {
      case "green":
        return "font-bold bg-green-200";
      case "blue":
        return "font-bold bg-blue-200";
      case "orange":
        return "font-bold bg-orange-200";
      case "violet":
        return "font-bold bg-emerald-200";
    }
  };

  return (
    <tr className={getClassNames()}>
      <td>Total</td>
      {totals.map((total) => {
        return (
          <td key={total.month}>
            <Currency amount={total.amount} />
          </td>
        );
      })}
    </tr>
  );
}

export default GroupTotalRow;
