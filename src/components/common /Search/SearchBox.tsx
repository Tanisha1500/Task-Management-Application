import { IoMdSearch } from "react-icons/io";
import "./SearchBox.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="search-container">
      <button className="search-button">
        <IoMdSearch size={16} />
      </button>
      <input
        type="text"
        placeholder=" Search To-Do"
        className="search-input-box"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
