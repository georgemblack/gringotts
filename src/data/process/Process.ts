/**
 * Generate a unique identifier for a raw transaction by:
 * 1. Sorting the keys of the raw transaction
 * 2. Concatenating the values of the sorted keys
 * 3. Removing all whitespace
 */
function rawTransactionId(raw: any): string {
  let id = "";
  const keys = Object.keys(raw);
  keys.sort();
  for (const key of keys) id += raw[key];
  id = id.replace(/\s/g, "");
  return "";
}
