import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import img from "../../public/images/logo.png";
import user from "../../public/icons/user.png";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  const linkClass = (isActive: boolean) =>
    isActive
      ? "bg-[#22C55E] text-white px-4 py-2 rounded-full font-semibold transition-all duration-300"
      : "text-gray-700 hover:bg-[#DCFCE7] hover:text-[#166534] px-4 py-2 rounded-full transition-all duration-300";

  return (
    <nav
      className="
        relative
        w-full
        h-20
        flex
        items-center
        justify-between
        bg-white
        border-b-4
        border-[#22C55E]
        px-4
        sm:px-8
        lg:px-12
      "
    >
      {/* ================= LOGO ================= */}

      <div
        className="
          flex
          items-center
        "
      >
        <img
          src={img}
          alt="Hacienda Fresh"
          className="
            h-12
            sm:h-14
            lg:h-16
            w-auto
            object-contain
          "
        />
      </div>

      {/* ================= MENU DESKTOP ================= */}

      <ul
        className="
          hidden
          md:flex
          items-center
          gap-5
          lg:gap-10
          text-base
          lg:text-lg
          font-semibold
        "
      >
        {/* Home */}

        <li>
          <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
        </li>

        {/* QR Scanner */}

        <li>
          <NavLink
            to="/qrScanner"
            className={({ isActive }) => linkClass(isActive)}
          >
            QRScanner
          </NavLink>
        </li>

        {/* information */}

        <li>
          <NavLink
            to="/information"
            className={({ isActive }) => linkClass(isActive)}
          >
            Infomation
          </NavLink>
        </li>
      </ul>

      {/* ================= USUARIO DESKTOP ================= */}

      <div
        className="
          hidden
          md:flex
          items-center
        "
      >
        <img
          src={user}
          alt="Usuario"
          className="
            w-10
            h-10
            lg:w-11
            lg:h-11
            rounded-full
            cursor-pointer
            transition-transform
            duration-300
            hover:scale-110
          "
        />
      </div>

      {/* ================= BOTON MOBILE ================= */}

      <button
        className="
          md:hidden
          text-2xl
          text-green-600
        "
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ================= MENU MOBILE ================= */}

      {menuOpen && (
        <div
          className="
              absolute
              top-20
              left-0
              w-full
              bg-white
              shadow-xl
              border-t
              z-40
              md:hidden
            "
        >
          <ul
            className="
                flex
                flex-col
                gap-4
                p-6
                font-semibold
              "
          >
            <li>
              <NavLink
                to="/"
                onClick={handleNavigate}
                className={({ isActive }) => linkClass(isActive)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/qrScanner"
                onClick={handleNavigate}
                className={({ isActive }) => linkClass(isActive)}
              >
                QRScanner
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/information"
                onClick={handleNavigate}
                className={({ isActive }) => linkClass(isActive)}
              >
                Information
              </NavLink>
            </li>

            <li>
              <img
                src={user}
                alt="Usuario"
                className="
                    w-10
                    h-10
                    rounded-full
                  "
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
