import { useLocation, Navigate } from "react-router-dom";
import FormCard from "./FormCard";
import { TextField } from "./TextField";

type LocationState = { qrValue: string };

type RegisterValues = {
  question1: string;
  question2: string;
  question3: string;
};

export default function RegisterCard() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state?.qrValue) {
    return <Navigate to="/qrScanner" replace />;
  }

  return (
    <FormCard<RegisterValues>
      badge="Código escaneado"
      title={state.qrValue}
      subtitle="Ingrese la información requerida"
      initialValues={{ question1: "", question2: "", question3: "" }}
      onSubmit={(values) => console.log(values)}
      submitLabel="Register"
      footer={
        <p className="text-gray-500 text-xs text-center mt-4 leading-relaxed">
          By clicking Register, you agree to accept Apex Financial&apos;s{" "}
          <a href="#" className="text-[#166534] font-medium hover:underline">
            Terms and Conditions
          </a>
          .
        </p>
      }
    >
      {({ values, handleChange }) => (
        <>
          <TextField
            id="q1"
            label="Primera pregunta"
            value={values.question1}
            onChange={(v) => handleChange("question1", v)}
          />
          <TextField
            id="q2"
            label="Segunda pregunta"
            value={values.question2}
            onChange={(v) => handleChange("question2", v)}
          />
          <TextField
            id="q3"
            label="Tercera pregunta"
            value={values.question3}
            onChange={(v) => handleChange("question3", v)}
          />
        </>
      )}
    </FormCard>
  );
}
