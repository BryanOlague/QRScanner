import FormCard from "./FormCard";
import { TextField } from "./TextField";
import QRCodeGenerator from "./QRCodeGenerator";
import { useState } from "react";

type RegisterValues = {
  name: string;
};

const fieldBackground = {
  backgroundColor: "#EEF1E3",
  backgroundImage:
    "repeating-linear-gradient(128deg, #EEF1E3 0px, #EEF1E3 40px, #E3E9D4 40px, #E3E9D4 44px)",
};

const stripePattern =
  "repeating-linear-gradient(135deg, #1E4536 0 10px, #4C9A6A 10px 20px, #D9A441 20px 24px, #BB6B4C 24px 28px)";

export default function QRCreated() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const handleSubmit = (values: RegisterValues) => {
    setQrValue(values.name);
  };

  if (qrValue) {
    return (
      <div className="flex flex-col bg-[#EEF1E3] items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="h-[6px] w-full" />

          <div className="flex flex-col items-center gap-6 p-6 sm:p-8 md:p-10">
            <div className="text-center">
              <span className="inline-block bg-[#E7EFE6] text-[#1E4536] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
                Codigo QR registrado
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E4536]">
                Código QR listo
              </h2>
              <p className="text-[#7A8C7F] text-sm mt-2 break-words">
                {qrValue}
              </p>
            </div>

            <div className="rounded-xl border border-[#E4DDC9] bg-[#FBF7EE] p-4">
              <QRCodeGenerator value={qrValue} size={220} />
            </div>

            <button
              onClick={() => setQrValue(null)}
              className="
                w-full text-sm font-semibold text-[#2F6B4F]
                border border-[#E4DDC9] rounded-full
                px-4 py-2.5
                transition-colors duration-300
                hover:bg-[#E7EFE6] hover:text-[#1E4536]
              "
            >
              Crear otro código
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormCard<RegisterValues>
      badge="Nuevo QR"
      title="Registrar"
      subtitle="Ingresa el identificador para generar su código QR"
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
      submitLabel="Generar QR"
    >
      {({ values, handleChange }) => (
        <TextField
          id="name"
          label="Indentificador"
          placeholder="Ej. SENS-014"
          value={values.name}
          onChange={(v) => handleChange("name", v)}
        />
      )}
    </FormCard>
  );
}
