import NavBar from "./components/NavBar";
import AppRouter from "./routers/AppRouter";

export default function App() {
  return (
    <>
      <NavBar />

      <div className="flex-1 overflow-y-auto">
        <AppRouter />
      </div>
    </>
  );
}
