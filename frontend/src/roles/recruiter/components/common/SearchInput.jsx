import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  placeholder = "Search anything...",
  value = "",
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex h-10 w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 ${className}`}
    >
      <FiSearch className="h-5 w-5 flex-shrink-0 text-slate-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default SearchInput;
