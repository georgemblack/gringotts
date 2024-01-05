import { useState } from "react";

import { exportDB, importDB } from "../lib/Repository";
import { DBContents } from "../lib/Types";

function Sync() {
  const [exportUrl, setExportUrl] = useState<string>("");
  const [exportTimestamp, setExportTimestamp] = useState<string>("");
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
    setExportTimestamp(new Date().toISOString().replace(/[:.]/g, "-"));
    setStatusMessage(result.message);
  };

  return (
    <main className="page-standard-width">
      <textarea
        value={importData}
        onChange={(e) => setImportData(e.target.value)}
        className="h-64 textarea"
      />
      <div className="flex justify-between mt-4">
        <div>
          <a
            href={exportUrl}
            download={`gringotts-export-${exportTimestamp}.json`}
            className="button"
          >
            Download
          </a>
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
    </main>
  );
}

export default Sync;
