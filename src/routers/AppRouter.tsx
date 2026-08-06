import { Route, Routes } from "react-router-dom";
import QRScanner from "../components/QRScanner";
// import Sidebar from "../components/SideBar";
import RegisterCard from "../components/RegisterCard";
import QRCreated from "../components/QRCreated";
import SearchDialog from "../components/SearchDialog";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchDialog />} />
        <Route path="/qrScanner" element={<QRScanner />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/qrCreated" element={<QRCreated />} />
        {/* <Route path="/information" element={<Sidebar />} /> */}
      </Routes>
    </>
  );
}
