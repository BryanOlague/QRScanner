import { Route, Routes } from "react-router-dom";
import QRScanner from "../components/QRScanner";
// import Sidebar from "../components/SideBar";
import RegisterCard from "../components/RegisterCard";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Inico</p>} />
        <Route path="/qrScanner" element={<QRScanner />} />
        <Route path="/register" element={<RegisterCard />} />
        {/* <Route path="/information" element={<Sidebar />} /> */}
      </Routes>
    </>
  );
}
