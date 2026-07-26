import { useState } from "react";
import {
  FaHome,
  FaShoppingCart,
  FaShoppingBag,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      name: "Cart",
      icon: <FaShoppingCart />,
    },
    {
      name: "Shopping",
      icon: <FaShoppingBag />,
    },
    {
      name: "My Favourite",
      icon: <FaHeart />,
    },
    {
      name: "Profile",
      icon: <FaUser />,
    },
  ];

  return (
    <>
      {/* Botón abrir en móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed
          top-24
          left-4
          z-50
          md:hidden
          bg-white
          p-3
          rounded-md
          shadow
          text-green-600
        "
      >
        <FaBars size={22} />
      </button>

      {/* Fondo oscuro móvil */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-30
            md:hidden
          "
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-screen
          w-72
          bg-white
          border-r
          border-gray-200
          p-4
          transition-transform
          duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >
        {/* Botón cerrar móvil */}
        <div className="flex justify-end mb-4 md:hidden">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menu.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={() => setIsOpen(false)}
              className="
                flex
                items-center
                gap-3
                rounded-md
                px-3
                py-3
                text-gray-700
                hover:bg-gray-100
                hover:text-green-600
                transition
              "
            >
              <span className="text-xl">{item.icon}</span>

              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
