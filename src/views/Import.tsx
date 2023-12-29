import { parse } from "papaparse";
import { useState } from "react";

import {
  c1CreditRecordsToTransactions,
  validTransaction,
} from "../lib/Process";
import { saveTransactions } from "../lib/Repository";
import { Account, C1CreditRecord } from "../lib/Types";

function Import() {
  const [csv, setCsv] = useState<string>("");

  const handleSubmit = () => {
    const result = parse<C1CreditRecord>(csv, { header: true });
    const transactions = c1CreditRecordsToTransactions(
      result.data,
      Account.CAPITAL_ONE_QUICKSILVER
    );
    const filtered = transactions.filter(validTransaction);
    saveTransactions(filtered);
  };

  return (
    <div className="mt-2">
      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        className="textarea w-full h-64"
      />
      <button onClick={handleSubmit} className="button mt-2">
        Submit
      </button>
    </div>
  );
}

export default Import;
