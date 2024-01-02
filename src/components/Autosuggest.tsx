function Autosuggest({
  value,
  suggestions,
  placeholder,
  onChange,
}: {
  value: string;
  suggestions: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const filtered = suggestions.filter((suggestion) => {
    return suggestion.toLowerCase().startsWith(value.toLowerCase());
  });
  const consolidated = filtered.slice(0, 3);

  return (
    <div>
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && consolidated.length > 0)
            onChange(consolidated[0]);
        }}
      />
      <div className="flex gap-1 mt-1 h-8 overflow-hidden flex-nowrap">
        {consolidated.map((suggestion) => (
          <span
            key={suggestion}
            className="tag cursor-pointer"
            onClick={() => onChange(suggestion)}
          >
            {suggestion}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Autosuggest;
