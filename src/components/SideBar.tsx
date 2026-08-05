import { useState, type ComponentType } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaSeedling } from "react-icons/fa";

export type SidebarItem =
  | {
      type: "link";
      name: string;
      to: string;
      icon: ComponentType<{ className?: string }>;
      variant?: "default" | "danger";
    }
  | {
      type: "action";
      name: string;
      onClick: () => void;
      icon: ComponentType<{ className?: string }>;
      variant?: "default" | "danger";
    };

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface SidebarBrand {
  title: string;
  tagline?: string;
  icon?: ComponentType<{ className?: string; size?: number }>;
}

interface SidebarProps {
  /** Secciones de navegación principal (arriba, con scroll si crecen) */
  sections: SidebarSection[];
  /** Sección fija al pie, ej. "Mi perfil" / "Cerrar sesión" (opcional) */
  footerSection?: SidebarSection;
  brand?: SidebarBrand;
}

const defaultBrand: SidebarBrand = {
  title: "Hacienda Fresh",
  tagline: "Monitoreo de sensores",
  icon: FaSeedling,
};

function itemClass(
  isActive: boolean,
  variant: "default" | "danger" = "default",
) {
  if (variant === "danger") {
    return "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-[#B5533E] hover:bg-[#FBEBE6] transition-colors duration-300";
  }
  return `relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors duration-300 ${
    isActive
      ? "bg-[#E7EFE6] text-[#1E4536] font-semibold"
      : "text-[#4C6355] hover:bg-[#F1ECDD] hover:text-[#1E4536]"
  }`;
}

function SidebarLink({
  item,
  onNavigate,
}: {
  item: SidebarItem;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  if (item.type === "action") {
    return (
      <button
        onClick={() => {
          item.onClick();
          onNavigate();
        }}
        className={itemClass(false, item.variant)}
      >
        <Icon className="text-lg" />
        {item.name}
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={({ isActive }) => itemClass(isActive, item.variant)}
    >
      {({ isActive }) => (
        <>
          {isActive && item.variant !== "danger" && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#4C9A6A]" />
          )}
          <Icon className="text-lg" />
          {item.name}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({
  sections,
  brand = defaultBrand,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const BrandIcon = brand.icon ?? FaSeedling;

  return (
    <>
      {/* Botón abrir en móvil */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-24 left-4 z-50 md:hidden bg-white p-3 rounded-full shadow border border-[#E4DDC9] text-[#2F6B4F]"
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
            <BrandIcon className="text-[#D9A441]" size={18} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base font-semibold text-[#1E4536]">
              {brand.title}
            </span>
            {brand.tagline && (
              <span className="text-[11px] text-[#8A9A8D]">
                {brand.tagline}
              </span>
            )}
          </div>
        </div>

        {/* Navegación (una o varias secciones) */}
        <nav className="flex flex-col gap-4 px-3 flex-1 overflow-y-auto">
          {sections.map((section, i) => (
            <div key={section.title ?? i} className="flex flex-col gap-1">
              {section.title && (
                <span className="px-3.5 mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#A9B6AC]">
                  {section.title}
                </span>
              )}
              {section.items.map((item) => (
                <SidebarLink
                  key={item.name}
                  item={item}
                  onNavigate={() => setIsOpen(false)}
                />
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
