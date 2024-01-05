import { useState } from "react";

import { process, normalizeTransactions } from "../lib/Process";
import { saveTransactions } from "../lib/Repository";
import { Account, AccountNames } from "../lib/Types";

function Import() {
  const [csv, setCsv] = useState<string>("");
  const [account, setAccount] = useState<string>(Account.CAPITAL_ONE_SAVOR);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async () => {
    const transactions = process(csv, account as Account);
    const normalizeResult = await normalizeTransactions(transactions);
    const saveResult = await saveTransactions(normalizeResult.transactions);

    setStatus(`${normalizeResult.message}; ${saveResult.message}`);
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
