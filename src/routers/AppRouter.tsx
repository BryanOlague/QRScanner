import { Route, Routes } from "react-router-dom";
import QRScanner from "../components/QRScanner";
// import Sidebar from "../components/SideBar";
import RegisterCard from "../components/RegisterCard";
import QRCreated from "../components/QRCreated";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<p>Inico</p>} />
        <Route path="/qrScanner" element={<QRScanner />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/qrCreated" element={<QRCreated />} />
        {/* <Route path="/information" element={<Sidebar />} /> */}
      </Routes>
    </>
  );
}
