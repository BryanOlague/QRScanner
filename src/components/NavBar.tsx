import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaQrcode,
  FaPlusCircle,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import img from "../../public/images/logo.png";
{
  /* Rutas de la app */
}
const navItems = [
  { to: "/", label: "Inicio", icon: FaHome },
  { to: "/qrscanner", label: "Escanear QR", icon: FaQrcode },
  { to: "/qrcreated", label: "Crear QR", icon: FaPlusCircle },
  { to: "/information", label: "Resultados", icon: FaClipboardList },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  {
    /*Cierra el menu del perfil al hacer clic fuera de el  */
  }
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  {
    /* Lofica para el cierrre de session */
  }
  const handleLogout = () => {
    setProfileOpen(false);
    setMenuOpen(false);
  };

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#2F6B4F] text-[#FBF7EE] shadow-sm"
        : "text-[#2F4A3D] hover:bg-[#E7EFE6] hover:text-[#1E4536]"
    }`;

  return (
    <nav className="relative w-full bg-[#FBF7EE] px-4 sm:px-8 lg:px-12 shadow-sm">
      <div className="flex h-20 items-center justify-between">
        {/* ================= LOGO ================= */}
        <div className="flex items-center gap-3">
          <img
            src={img}
            alt="Hacienda Fresh"
            className="h-11 sm:h-12 lg:h-14 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-serif text-lg lg:text-xl font-semibold text-[#1E4536]">
              Hacienda Fresh
            </span>
            <span className="text-[11px] tracking-wide text-[#8A9A8D]">
              De la finca a tu mesa
            </span>
          </div>
        </div>

        {/* ================= MENU DESKTOP ================= */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 rounded-full p-1 border border-[#E4DDC9]">
          {navItems.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => linkClass(isActive)}
              >
                <Icon className="text-[15px]" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ================= PERFIL DESKTOP ================= */}
        <div className="hidden md:block relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-full border border-[#E4DDC9] pl-2 pr-3 py-1.5 hover:bg-[#F1ECDD] transition-colors duration-300"
          >
            <FaUserCircle className="text-[28px] text-[#2F6B4F]" />
            <span className="text-sm font-semibold text-[#2F4A3D]">
              Mi cuenta
            </span>
            <FaChevronDown
              className={`text-xs text-[#8A9A8D] transition-transform duration-300 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[#E4DDC9] bg-white shadow-lg overflow-hidden z-50">
              <NavLink
                to="/perfil"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-[#2F4A3D] hover:bg-[#F1ECDD] transition-colors"
              >
                <FaUserCircle className="text-lg text-[#2F6B4F]" />
                Ver perfil
              </NavLink>
              <div className="h-px bg-[#EEE8D8]" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-[#B5533E] hover:bg-[#FBEBE6] transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        {/* ================= BOTON MOBILE ================= */}
        <button
          className="md:hidden text-2xl text-[#2F6B4F]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ============ franja decorativa (firma visual) ============ */}

      {/* ================= MENU MOBILE ================= */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-[#E4DDC9] z-40 md:hidden">
          <ul className="flex flex-col gap-2 p-5 font-semibold">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={handleNavigate}
                  className={({ isActive }) => linkClass(isActive) + " w-full"}
                >
                  <Icon className="text-base" />
                  {label}
                </NavLink>
              </li>
            ))}

            <div className="h-px bg-[#EEE8D8] my-2" />

            <li>
              <NavLink
                to="/perfil"
                onClick={handleNavigate}
                className="flex w-full items-center gap-3 px-4 py-2 rounded-full text-[#2F4A3D] hover:bg-[#E7EFE6] transition-colors"
              >
                <FaUserCircle className="text-lg text-[#2F6B4F]" />
                Ver perfil
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2 rounded-full text-[#B5533E] hover:bg-[#FBEBE6] transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
