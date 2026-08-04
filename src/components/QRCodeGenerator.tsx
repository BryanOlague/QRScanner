import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

interface QRCodeCanvasProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  showDownload?: boolean;
  fileName?: string;
}
export default function QRCodeGenerator({
  value,
  size = 200,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  showDownload = true,
  fileName = "qrcode",
}: QRCodeCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = url;
    link.download = `${fileName}.png`;
    link.click();
  };

  if (!value) {
    return (
      <p className="text-gray-500 text-sm text-center">
        No hay valor para generar el código QR.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={wrapperRef}
        className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
      >
        <QRCodeCanvas
          value={value}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level="H"
        />
      </div>

      {showDownload && (
        <button
          onClick={handleDownload}
          className="
            bg-[#22C55E] text-white font-semibold
            px-4 py-2 rounded-full text-sm
            transition-all duration-300
            hover:bg-[#16A34A]
            focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2
            active:scale-[0.98]
          "
        >
          Descargar QR
        </button>
      )}
    </div>
  );
}
