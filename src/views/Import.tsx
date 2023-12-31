import { useState } from "react";

import { csvToTransactions, validTransaction } from "../lib/Process";
import { saveTransactions } from "../lib/Repository";
import { Account, AccountNames } from "../lib/Types";

function Import() {
  const [csv, setCsv] = useState<string>("");
  const [account, setAccount] = useState<string>(Account.CAPITAL_ONE_SAVOR);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // TODO: Handule duplicate transactions by adding values together
  const handleSubmit = async () => {
    const transactions = csvToTransactions(csv, account as Account);
    const filtered = transactions.filter(validTransaction);
    const message = await saveTransactions(filtered);
    setStatusMessage(message);
    setCsv("");
  };

  return (
    <div className="mt-2">
      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        className="textarea w-full h-64"
      />
      <div className="flex justify-between mt-2">
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
      <div className="mt-2">{statusMessage && <p>{statusMessage}</p>}</div>
    </div>
  );
}

export default Import;
