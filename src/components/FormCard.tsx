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
    <div className="bg-[#EEF1E3] flex items-center justify-center min-h-screen px-4 py-8 sm:px-6">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md overflow-hidden">
        <div className="p-6 sm:p-8 md:p-10">
          <div className="text-center mb-6 sm:mb-8">
            {badge && (
              <span className="inline-block bg-[#F3E7CE] text-[#8A5A2B] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
                {badge}
              </span>
            )}
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E4536] break-words">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[#7A8C7F] text-sm sm:text-base mt-2">
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
                w-full bg-[#2F6B4F] text-[#FBF7EE] font-semibold
                px-4 py-2.5 sm:py-3 rounded-full
                transition-all duration-300
                hover:bg-[#1E4536]
                focus:outline-none focus:ring-2 focus:ring-[#4C9A6A] focus:ring-offset-2
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
    </div>
  );
}
