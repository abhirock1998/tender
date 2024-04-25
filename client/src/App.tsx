import "./App.css";
import HomePage from "./pages/Home/Page";
import AdminPage from "./pages/Admin/Page";
import BidPage from "./pages/Bid/Page";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="h-screen border border-red-600">
      <Routes>
        <Route element={<BidPage />} path="/bid/:tender_id" />
        <Route element={<AdminPage />} path="/admin" />
        <Route element={<HomePage />} path="*" />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
