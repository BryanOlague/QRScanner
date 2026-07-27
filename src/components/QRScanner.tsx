import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

export default function QRScanner() {
  const [result, setResult] = useState<string>("");

  const [scanned, setScanned] = useState(false);

    const navigate = useNavigate();

  const handleScan = (detectedCodes: any[]) => {
    if (!detectedCodes.length) return;

    if (scanned) return;

    const value = detectedCodes[0]?.rawValue;

    if (value) {
      console.log("QR detectado:", value);

      setResult(value);

      setScanned(true);

      navigate("/register", { state: { qrValue: value } });

    }
  };

  const resetScanner = () => {
    setResult("");

    setScanned(false);
  };

  return (
    <main
      className="
        relative
        w-screen
        h-screen
        overflow-hidden
        bg-black
      "
    >
      {/* ================= CAMERA ================= */}

      <div
        className="
          absolute
          inset-0
          w-full
          h-full
        "
      >
        <Scanner
          onScan={handleScan}
          onError={(error) => {
            console.error("Error cámara:", error);
          }}
          constraints={{
            facingMode: "environment",
          }}
          styles={{
            container: {
              width: "100%",

              height: "100%",
            },

            video: {
              width: "100%",

              height: "100%",

              objectFit: "cover",
            },
          }}
        />
      </div>

      {/* ================= OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-black/40
        "
      />

      {/* ================= QR FRAME ================= */}

      <div
        className="
          absolute
          top-1/2
          left-1/2
          z-20
          h-64
          w-64
          sm:h-72
          sm:w-72
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <span
          className="
            absolute
            left-0
            top-0
            h-12
            w-12
            border-l-4
            border-t-4
            border-cyan-400
            rounded-tl-xl
          "
        />

        <span
          className="
            absolute
            right-0
            top-0
            h-12
            w-12
            border-r-4
            border-t-4
            border-cyan-400
            rounded-tr-xl
          "
        />

        <span
          className="
            absolute
            bottom-0
            left-0
            h-12
            w-12
            border-l-4
            border-b-4
            border-cyan-400
            rounded-bl-xl
          "
        />

        <span
          className="
            absolute
            bottom-0
            right-0
            h-12
            w-12
            border-r-4
            border-b-4
            border-cyan-400
            rounded-br-xl
          "
        />

        {/* Línea de escaneo */}

        {!result && (
          <div
            className="
                scan-line
                absolute
                left-4
                right-4
                h-1
                bg-cyan-400
                shadow-lg
                shadow-cyan-400
              "
          />
        )}
      </div>

      {/* ================= TEXTO ================= */}

      {!result && (
        <div
          className="
              absolute
              bottom-24
              z-20
              w-full
              px-6
              text-center
              text-white
            "
        >
          <h1
            className="
                text-2xl
                sm:text-3xl
                font-bold
              "
          >
            Escanear código QR
          </h1>

          <p
            className="
                mt-2
                text-gray-300
              "
          >
            Coloca el código dentro del marco
          </p>
        </div>
      )}

      {/* ================= RESULTADO ================= */}


    </main>
  );
}
