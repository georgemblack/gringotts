import { useState } from "react";

function Import() {
  const [csv, setCsv] = useState<string>("");

  const handleSubmit = () => {
    console.log(csv);
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
