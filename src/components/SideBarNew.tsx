"use client";

import { useState, type ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  FaBars,
  FaTimes,
  FaSeedling,
  FaHome,
  FaQrcode,
  FaPlusCircle,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";

interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

// Items de nivel superior, antes del grupo "QR"
const topNavigation: NavItem[] = [
  { to: "/", label: "Inicio", icon: FaHome },
  { to: "/qrscanner", label: "Escanear QR", icon: FaQrcode },
];

// Grupo "QR": crear uno nuevo o ver uno existente
const qrNavigation: NavItem[] = [
  { to: "/qrcreated", label: "Crear QR", icon: FaPlusCircle },
  { to: "/qr/existente", label: "Ver código existente", icon: FaSearch },
];

// Items al final del menú, fuera del grupo "QR"
const bottomNavigation: NavItem[] = [
  { to: "/information", label: "Resultados", icon: FaClipboardList },
];

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Clase de item de navegación, siguiendo el mismo lenguaje visual
// que el Sidebar de Hacienda Fresh (fondo crema, acentos verdes/dorados)
function itemClasses(current: boolean) {
  return classNames(
    current
      ? "bg-[#E7EFE6] text-[#1E4536] font-semibold"
      : "text-[#4C6355] hover:bg-[#F1ECDD] hover:text-[#1E4536]",
    "relative group flex gap-x-3 rounded-xl p-2.5 text-sm font-medium transition-colors duration-300",
  );
}

// Lista de navegación reutilizable (se usa tanto en móvil como en desktop)
function NavList({
  items,
  currentPath,
  onNavigate,
}: {
  items: NavItem[];
  currentPath: string;
  onNavigate?: () => void;
}) {
  return (
    <ul role="list" className="space-y-1">
      {items.map((item) => {
        const current = currentPath === item.to;
        return (
          <li key={item.label}>
            <Link
              to={item.to}
              onClick={onNavigate}
              className={itemClasses(current)}
            >
              {current && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[#4C9A6A]" />
              )}
              <item.icon aria-hidden="true" className="size-5 shrink-0" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function SideBarNew() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-[#1E4536]/40 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <FaTimes
                      aria-hidden="true"
                      className="size-6 text-[#1E4536]"
                    />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar component */}
              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#FBF7EE] px-6 pb-2 border-r border-[#E4DDC9]">
                <div className="flex items-center gap-3 pb-2 pt-6">
                  <div className="h-10 w-10 rounded-full bg-[#1E4536] flex items-center justify-center shrink-0">
                    <FaSeedling className="text-[#D9A441]" size={18} />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-serif text-base font-semibold text-[#1E4536]">
                      Hacienda Fresh
                    </span>
                    <span className="text-[11px] text-[#8A9A8D]">
                      Workspace
                    </span>
                  </div>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-6">
                    <li>
                      <NavList
                        items={topNavigation}
                        currentPath={pathname}
                        onNavigate={() => setSidebarOpen(false)}
                      />
                    </li>
                    <li>
                      <div className="px-2.5 mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#A9B6AC]">
                        QR
                      </div>
                      <NavList
                        items={qrNavigation}
                        currentPath={pathname}
                        onNavigate={() => setSidebarOpen(false)}
                      />
                    </li>
                    <li>
                      <NavList
                        items={bottomNavigation}
                        currentPath={pathname}
                        onNavigate={() => setSidebarOpen(false)}
                      />
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden bg-[#FBF7EE] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-[#E4DDC9] px-6">
            <div className="flex items-center gap-3 pb-2 pt-6">
              <div className="h-10 w-10 rounded-full bg-[#1E4536] flex items-center justify-center shrink-0">
                <FaSeedling className="text-[#D9A441]" size={18} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base font-semibold text-[#1E4536]">
                  Hacienda Fresh
                </span>
                <span className="text-[11px] text-[#8A9A8D]">Workspace</span>
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-6">
                <li>
                  <NavList items={topNavigation} currentPath={pathname} />
                </li>
                <li>
                  <div className="px-2.5 mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#A9B6AC]">
                    QR
                  </div>
                  <NavList items={qrNavigation} currentPath={pathname} />
                </li>
                <li>
                  <NavList items={bottomNavigation} currentPath={pathname} />
                </li>
                <li className="-mx-6 mt-auto">
                  <Link
                    to="/perfil"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-medium text-[#1E4536] hover:bg-[#F1ECDD] border-t border-[#E4DDC9]"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-[#E7EFE6] outline outline-1 -outline-offset-1 outline-[#E4DDC9]"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#FBF7EE] border-b border-[#E4DDC9] px-4 py-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-[#2F6B4F] lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm font-semibold text-[#1E4536]">
            Dashboard
          </div>
          <Link to="/perfil">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-8 rounded-full bg-[#E7EFE6] outline outline-1 -outline-offset-1 outline-[#E4DDC9]"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
