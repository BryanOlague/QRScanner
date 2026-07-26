import { useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import AppRouter from "./routers/AppRouter";

export default function App() {
  const location = useLocation();

  const showSidebar = location.pathname === "/information";

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}

      <div className="flex flex-col flex-1">
        <NavBar />

        <main
          className={`
            flex-1
            overflow-y-auto
            ${showSidebar ? "md:ml-72" : ""}
          `}
        >
          <AppRouter />
        </main>
      </div>
    </div>
  );
}
