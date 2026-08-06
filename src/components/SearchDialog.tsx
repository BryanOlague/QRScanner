"use client";

import { useMemo, useState } from "react";
import { Combobox, ComboboxInput } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";

// --- 1. Reemplaza esto por tu tipo de dato real (fila de la tabla) ---
interface Sensor {
  id: number;
  name: string;
  location: string;
  status: "Activo" | "Inactivo";
}

const sensors: Sensor[] = [
  { id: 1, name: "SENS-014", location: "Invernadero A", status: "Activo" },
  { id: 2, name: "SENS-015", location: "Invernadero B", status: "Activo" },
  { id: 3, name: "SENS-016", location: "Invernadero A", status: "Inactivo" },
  { id: 4, name: "SENS-021", location: "Bodega", status: "Activo" },
];

export default function SearchDialog() {
  const [query, setQuery] = useState("");

  // --- 2. El filtro: recalcula solo cuando cambia query o la data ---
  const filteredSensors = useMemo(() => {
    if (query === "") return sensors;
    const q = query.toLowerCase();
    return sensors.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="rounded-2xl border border-[#E4DDC9] bg-white shadow-sm overflow-hidden">
      {/* --- 3. El filtro reutiliza el Combobox, pero SIN Dialog ni Options:
          es solo un input que actualiza `query` en cada tecleo --- */}
      <div className="border-b border-[#E4DDC9] bg-[#FBF7EE] p-4">
        <Combobox>
          <div className="relative">
            <ComboboxInput
              className="h-10 w-full max-w-xs rounded-full border border-[#E4DDC9] bg-white pl-10 pr-4 text-sm text-[#1E4536] outline-none placeholder:text-[#8A9A8D] focus:border-[#4C9A6A]"
              placeholder="Buscar sensor o ubicación..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <FaSearch
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8A9A8D]"
              aria-hidden="true"
            />
          </div>
        </Combobox>
      </div>

      {/* --- 4. La tabla renderiza `filteredSensors`, no `sensors` --- */}
      <table className="w-full text-left text-sm">
        <thead className="bg-[#F1ECDD] text-[11px] uppercase tracking-wide text-[#8A9A8D]">
          <tr>
            <th className="px-4 py-3 font-semibold">Identificador</th>
            <th className="px-4 py-3 font-semibold">Ubicación</th>
            <th className="px-4 py-3 font-semibold">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4DDC9]">
          {filteredSensors.map((sensor) => (
            <tr key={sensor.id} className="hover:bg-[#FBF7EE]">
              <td className="px-4 py-3 font-medium text-[#1E4536]">
                {sensor.name}
              </td>
              <td className="px-4 py-3 text-[#4C6355]">{sensor.location}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    sensor.status === "Activo"
                      ? "inline-block rounded-full bg-[#E7EFE6] px-2.5 py-0.5 text-xs font-semibold text-[#1E4536]"
                      : "inline-block rounded-full bg-[#FBEBE6] px-2.5 py-0.5 text-xs font-semibold text-[#B5533E]"
                  }
                >
                  {sensor.status}
                </span>
              </td>
            </tr>
          ))}

          {filteredSensors.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-8 text-center text-sm text-[#7A8C7F]"
              >
                No se encontraron resultados para “{query}”.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
