import { useState } from "react";

import { csvToTransactions, normalizeTransactions } from "../lib/Process";
import { saveTransactions } from "../lib/Repository";
import { Account, AccountNames } from "../lib/Types";

function Import() {
  const [csv, setCsv] = useState<string>("");
  const [account, setAccount] = useState<string>(Account.CAPITAL_ONE_SAVOR);
  const [status, setStatus] = useState<string>("");

  // TODO: Refactor
  const handleSubmit = async () => {
    let message = "";

    const transactions = csvToTransactions(csv, account as Account);
    const result = await normalizeTransactions(transactions);
    message += `${result.status}; `;
    message += await saveTransactions(result.transactions);
    setStatus(message);
    setCsv("");
  };

  return (
    <main className="page-standard-width">
      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        className="h-64 textarea"
      />
      <div className="flex justify-between mt-4">
        <div className="select">
          <select
            onChange={(e) => {
              setAccount(e.target.value);
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
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
      <div className="mt-2">{status && <p>{status}</p>}</div>
    </main>
  );
}

export default Import;
