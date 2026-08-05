import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar, { type SidebarSection } from "./components/SideBar";
import AppRouter from "./routers/AppRouter";
import { FaHome, FaQrcode } from "react-icons/fa";

const informationSection: SidebarSection[] = [
  {
    items: [
      { type: "link", name: "Inicio", to: "/", icon: FaHome },
      { type: "link", name: "Escanear QR", to: "/qrScanner", icon: FaQrcode },
    ],
  },
];

export default function App() {
  const location = useLocation();

  const showSidebar = location.pathname === "/information";

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar sections={informationSection} />}

        <main
          className={`
            flex-1
            overflow-y-auto
            
          `}
        >
          <AppRouter />
        </main>
      </div>
    </div>
  );
}
