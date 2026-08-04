import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaQrcode,
  FaPlusCircle,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaSeedling,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const menu = [
  { name: "Inicio", to: "/", icon: FaHome },
  { name: "Escanear QR", to: "/qrScanner", icon: FaQrcode },
  { name: "Crear QR", to: "/crearQr", icon: FaPlusCircle },
  { name: "Resultados", to: "/information", icon: FaClipboardList },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (isActive: boolean) =>
    `relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "bg-[#E7EFE6] text-[#1E4536] font-semibold"
        : "text-[#4C6355] hover:bg-[#F1ECDD] hover:text-[#1E4536]"
    }`;

  return (
    <>
      {/* Botón abrir en móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed top-24 left-4 z-50 md:hidden
          bg-white p-3 rounded-full shadow
          border border-[#E4DDC9]
          text-[#2F6B4F]
        "
        aria-label="Abrir menú"
      >
        <FaBars size={20} />
      </button>

      {/* Fondo oscuro móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#1E4536]/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40
          h-screen w-72
          bg-[#FBF7EE] border-r border-[#E4DDC9]
          flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Botón cerrar móvil */}
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#2F6B4F]"
            aria-label="Cerrar menú"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Marca */}
        <div className="flex items-center gap-3 px-5 pb-5 pt-2 md:pt-6">
          <div className="h-10 w-10 rounded-full bg-[#1E4536] flex items-center justify-center shrink-0">
            <FaSeedling className="text-[#D9A441]" size={18} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base font-semibold text-[#1E4536]">
              Hacienda Fresh
            </span>
            <span className="text-[11px] text-[#8A9A8D]"></span>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
          {menu.map(({ name, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => linkClass(isActive)}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#4C9A6A]" />
                  )}
                  <Icon className="text-lg" />
                  {name}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Cuenta */}
        <div className="px-3 pb-5 pt-3 border-t border-[#E4DDC9] flex flex-col gap-1">
          <NavLink
            to="/perfil"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => linkClass(isActive)}
          >
            <FaUserCircle className="text-lg" />
            Mi perfil
          </NavLink>
          <button
            //onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-[#B5533E] hover:bg-[#FBEBE6] transition-colors duration-300"
          >
            <FaSignOutAlt className="text-lg" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
