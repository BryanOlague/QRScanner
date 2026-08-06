import AppRouter from "./routers/AppRouter";
import SideBarNew from "./components/SideBarNew";

export default function App() {
  return (
    <div className="flex h-screen flex-col">
      {/* Sidebar principal: fijo en desktop (lg:fixed), por eso el
          contenido de al lado necesita lg:pl-72 para no quedar tapado */}
      <SideBarNew />

      <div className="flex flex-1 overflow-hidden lg:pl-72">
        <main className="flex-1 overflow-y-auto">
          <AppRouter />
        </main>
      </div>
    </div>
  );
}
