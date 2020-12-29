import React, { useState } from "react";

function useDropdown(label, defaultOption, options) {
  const [state, setState] = useState(defaultOption);

  const dropdownId = label.replace(" ", "").toLowerCase();

  const Dropdown = () => (
    <label htmlFor={dropdownId}>
      {label}
      <select
        value={state}
        id={dropdownId}
        onChange={(e) => setState(e.target.value)}
        onBlur={(e) => setState(e.target.value)}
        disabled={!options.length}
      >
        <option />
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
}

export default useDropdown;
