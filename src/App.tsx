import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import AppRouter from "./routers/AppRouter";

export default function App() {
  const location = useLocation();

  const showSidebar = location.pathname === "/information";

  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && <Sidebar />}

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
