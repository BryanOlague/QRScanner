import { useState, type ReactNode } from "react";

interface FormCardProps<T> {
  badge?: string;
  title: string;
  subtitle?: string;
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  submitLabel?: string;
  footer?: ReactNode;
  children: (props: {
    values: T;
    handleChange: (field: keyof T, value: string) => void;
  }) => ReactNode;
}

export default function FormCard<T extends Record<string, unknown>>({
  badge,
  title,
  subtitle,
  initialValues,
  onSubmit,
  submitLabel = "Enviar",
  footer,
  children,
}: FormCardProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#DCFCE7] flex items-center justify-center min-h-screen px-4 py-8 sm:px-6">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md border-t-4 border-[#22C55E]">
        <div className="text-center mb-6 sm:mb-8">
          {badge && (
            <span className="inline-block bg-[#DCFCE7] text-[#166534] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
              {badge}
            </span>
          )}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              {subtitle}
            </p>
          )}
        </div>

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {children({ values, handleChange })}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full bg-[#22C55E] text-white font-semibold
              px-4 py-2.5 sm:py-3 rounded-full
              transition-all duration-300
              hover:bg-[#16A34A]
              focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2
              active:scale-[0.98]
              disabled:opacity-60
            "
          >
            {isSubmitting ? "Enviando..." : submitLabel}
          </button>

          {footer}
        </form>
      </div>
    </div>
  );
}
