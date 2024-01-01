import { useState } from "react";

import { exportDB, importDB } from "../lib/Repository";
import { DBContents } from "../lib/Types";

function Sync() {
  const [exportUrl, setExportUrl] = useState<string>("");
  const [importData, setImportData] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleImport = async () => {
    if (importData === "") return;
    const data: DBContents = JSON.parse(importData);
    const message = await importDB(data);
    setStatusMessage(message);
  };

  const handleExport = async () => {
    const result = await exportDB();
    const blob = new Blob([JSON.stringify(result.db)], { type: "text/json" });
    setExportUrl(URL.createObjectURL(blob));
    setStatusMessage(result.message);
  };

  return (
    <>
      <div className="mt-2">
        <textarea
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          className="textarea h-64"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <a href={exportUrl}>Download</a>
        </div>
        <div className="flex gap-2">
          <button className="button" onClick={handleImport}>
            Import
          </button>
          <button className="button" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>
      <div className="mt-2">{statusMessage && <p>{statusMessage}</p>}</div>
    </>
  );
}

export default Sync;
