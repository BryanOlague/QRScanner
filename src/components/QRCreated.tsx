import FormCard from "./FormCard";
import { TextField } from "./TextField";
import QRCodeGenerator from "./QRCodeGenerator";
import { useState } from "react";

type RegisterValues = {
  name: string;
};

export default function QRCreated() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const handleSubmit = (values: RegisterValues) => {
    setQrValue(values.name);
  };

  if (qrValue) {
    return (
      <div className="bg-[#DCFCE7] flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-6">
        <h2 className="text-xl font-bold text-gray-800">Tu código QR</h2>
        <QRCodeGenerator value={qrValue} size={250} />
        <button
          onClick={() => setQrValue(null)}
          className="text-sm text-[#166534] font-medium hover:underline"
        >
          Crear otro
        </button>
      </div>
    );
  }

  return (
    <FormCard<RegisterValues>
      badge=""
      title="New QR"
      subtitle="Ingrese la información requerida"
      initialValues={{ name: "" }}
      onSubmit={handleSubmit}
      submitLabel="Created"
    >
      {({ values, handleChange }) => (
        <>
          <TextField
            id="name"
            label="Nombre del producto"
            value={values.name}
            onChange={(v) => handleChange("name", v)}
          />
        </>
      )}
    </FormCard>
  );
}
