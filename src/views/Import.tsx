import { parse } from "papaparse";
import { useState } from "react";

import {
  appleCardCreditRecordsToTransactions,
  c1CreditRecordsToTransactions,
  validTransaction,
} from "../lib/Process";
import { saveTransactions } from "../lib/Repository";
import {
  Account,
  AccountNames,
  AppleCardCreditRecord,
  C1CreditRecord,
  Transaction,
} from "../lib/Types";

function Import() {
  const [csv, setCsv] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [account, setAccount] = useState<string>(Account.CAPITAL_ONE_SAVOR);

  // TODO: Handule duplicate transactions by adding values together
  // TODO: Handle all record types
  const handleSubmit = async () => {
    let transactions: Transaction[] = [];

    // Parse Capital One credit card CSV
    if (
      [Account.CAPITAL_ONE_SAVOR, Account.CAPITAL_ONE_QUICKSILVER].includes(
        account as Account
      )
    ) {
      const result = parse<C1CreditRecord>(csv, { header: true });
      transactions = c1CreditRecordsToTransactions(
        result.data,
        account as Account
      );
    }

    // Parse Apple Card credit card CSV
    if (account === Account.APPLE_CARD) {
      const result = parse<AppleCardCreditRecord>(csv, { header: true });
      transactions = appleCardCreditRecordsToTransactions(
        result.data,
        account as Account
      );
    }

    const filtered = transactions.filter(validTransaction);
    const message = await saveTransactions(filtered);
    setStatusMessage(message);
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
