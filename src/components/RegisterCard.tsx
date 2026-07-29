import { useLocation, Navigate } from "react-router-dom";

type LocationState = {
  qrValue: string;
};

export default function RegisterCard() {
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state?.qrValue) {
    return <Navigate to="/qrScanner" replace />;
  }

  const { qrValue } = state;

  return (
    <div className="bg-[#DCFCE7] flex items-center justify-center min-h-screen px-4 py-8 sm:px-6">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md border-t-4 border-[#22C55E]">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block bg-[#DCFCE7] text-[#166534] text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3">
            Código escaneado
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
            {qrValue}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Ingrese la información requerida
          </p>
        </div>

        {/* ================= FORM ================= */}
        <form className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-semibold mb-1.5"
            >
              Primera pregunta *
            </label>
            <input
              type="text"
              id="fullName"
              required
              placeholder="Primera pregunta"
              className="
                w-full px-4 py-2.5
                border border-gray-300 rounded-lg
                text-gray-700 text-sm sm:text-base
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]
              "
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-1.5"
            >
              Segunda pregunta *
            </label>
            <input
              type="text"
              id="email"
              required
              placeholder="Segunda pregunta"
              className="
                w-full px-4 py-2.5
                border border-gray-300 rounded-lg
                text-gray-700 text-sm sm:text-base
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]
              "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-1.5"
            >
              Tercera pregunta
            </label>
            <input
              type="text"
              id="password"
              required
              placeholder="Tercera pregunta"
              className="
                w-full px-4 py-2.5
                border border-gray-300 rounded-lg
                text-gray-700 text-sm sm:text-base
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E]
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full bg-[#22C55E] text-white font-semibold
              px-4 py-2.5 sm:py-3 rounded-full
              transition-all duration-300
              hover:bg-[#16A34A]
              focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2
              active:scale-[0.98]
            "
          >
            Register
          </button>

          <p className="text-gray-500 text-xs text-center mt-4 leading-relaxed">
            By clicking Register, you agree to accept Apex Financial&apos;s{" "}
            <a href="#" className="text-[#166534] font-medium hover:underline">
              Terms and Conditions
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
