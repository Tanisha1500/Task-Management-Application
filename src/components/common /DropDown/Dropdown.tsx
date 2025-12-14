import { useEffect, useState } from "react";
import "./Dropdown.css";
import { FcDown } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";

export type DropdownOption = {
  label: string;
  value: string;
  color: string;
};

type StatusDropdownProps = {
  options: DropdownOption[];
  value: DropdownOption;
  onChange?: (option: DropdownOption) => void;
  placeholder?: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select status",
}: StatusDropdownProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.status-dropdown')) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  

  return (
    <div className="status-dropdown">
      {/* Header */}
      <div
        className="dropdown-header"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ? (
          <>
            <span
              className="status-dot"
              style={{ backgroundColor: value.color }}
            />
            <span>{value.label}</span>
          </>
        ) : (
          <span className="placeholder">{placeholder}</span>
        )}

        <span className="arrow"><IoMdArrowDropdown/></span>
      </div>

      {/* Options */}
      {open && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => {
                onChange?.(option);
                setOpen(false);
              }}
            >
              <span
                className="status-dot"
                style={{ backgroundColor: option.color }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
