// components/ui/select.tsx
import React from "react";

interface SelectProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  id,
  value,
  onValueChange,
  children,
}) => {
  return (
    <div className="relative">
      {" "}
      {/* Added relative wrapper for better positioning */}
      <select
        id={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="border rounded px-3 py-2 w-full appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" // Basic styling
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        {" "}
        {/* Added arrow icon container */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
