interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  required = true,
  placeholder,
}: TextFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-semibold mb-1.5"
      >
        {label} {required && "*"}
      </label>
      <input
        type="text"
        id={id}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-4 py-2.5
          border border-gray-300 rounded-lg
          text-gray-700 text-sm sm:text-base
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]
        "
      />
    </div>
  );
}
