import { Tag, TagNames } from "../lib/Types";

function SelectableTag({
  value,
  selected,
  onChange,
}: {
  value: Tag;
  selected: boolean;
  onChange: (selected: boolean) => void;
}) {
  return (
    <span
      className="tag is-info cursor-pointer is-light"
      onClick={() => {
        console.log("clicked: ", !value);
        onChange(!selected);
      }}
    >
      {selected ? `${TagNames[value]} ✔` : TagNames[value]}
    </span>
  );
}

export default SelectableTag;
