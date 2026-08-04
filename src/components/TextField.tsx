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
        className="block text-[#4C6355] text-xs sm:text-sm font-semibold mb-1.5"
      >
        {label}
        {required && <span className="text-[#BB6B4C] ml-0.5">*</span>}
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
          bg-[#FBF7EE] border border-[#E4DDC9] rounded-xl
          text-[#2F4A3D] text-sm sm:text-base
          placeholder:text-[#A9B6AC]
          transition-colors duration-300
          focus:outline-none focus:bg-white focus:border-[#4C9A6A] focus:ring-2 focus:ring-[#4C9A6A]/30
        "
      />
    </div>
  );
}
