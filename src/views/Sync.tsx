import { useState } from "react";

import { getAllData } from "../lib/Repository";

function Sync() {
  const [url, setUrl] = useState<string>("");

  const handleImport = () => {};

  const handleExport = async () => {
    const result = await getAllData();
    console.log(result);
    const blob = new Blob([JSON.stringify(result)], { type: "text/json" });
    setUrl(URL.createObjectURL(blob));
  };

  return (
    <div>
      <div className="mt-4 flex gap-2">
        <button className="button" onClick={handleImport}>
          Import
        </button>
        <button className="button" onClick={handleExport}>
          Export
        </button>
      </div>
      <div className="mt-2">
        <a href={url}>Download</a>
      </div>
    </div>
  );
}

export default Sync;
