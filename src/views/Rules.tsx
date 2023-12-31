import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";

import { db } from "../lib/DB";
import { saveRule } from "../lib/Repository";
import { RuleType, RuleTypeNames } from "../lib/Types";

function Rules() {
  const rules = useLiveQuery(() => db.rules.toArray()) || [];

  const [type, setType] = useState<string>(RuleType.MERCH_TO_CAT);
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveRule({
      type: type as RuleType,
      source,
      destination,
    });
    setType("");
    setSource("");
    setDestination("");
  };

  return (
    <>
      <table className="table w-full mt-4">
        <thead>
          <tr>
            <th>Rule Type</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id}>
              <td>{RuleTypeNames[rule.type as RuleType]}</td>
              <td>{rule.source}</td>
              <td>{rule.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <div className="select">
                  <select
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    value={type}
                  >
                    {Object.keys(RuleType).map((key) => (
                      <option key={key} value={key}>
                        {RuleTypeNames[key as RuleType]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grow">
                  <input
                    className="input"
                    placeholder="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
                <div className="grow">
                  <input
                    className="input"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <button type="submit" className="button is-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rules;
