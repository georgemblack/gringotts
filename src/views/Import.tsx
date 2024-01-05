import { useState } from "react";

import AccountSelect from "../components/AccountSelect";
import { process } from "../lib/Process";
import { saveTransactions } from "../lib/Repository";
import { Account } from "../lib/Types";

function Import() {
  const [csv, setCsv] = useState<string>("");
  const [account, setAccount] = useState<Account>(Account.CAPITAL_ONE_SAVOR);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async () => {
    const processResult = process(csv, account);
    const saveResult = await saveTransactions(processResult.transactions);

    setStatus(`${processResult.message}; ${saveResult.message}`);
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
        <AccountSelect value={account} onSelect={setAccount} />
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
      <div className="mt-2">{status && <p>{status}</p>}</div>
    </main>
  );
}

export default Import;
