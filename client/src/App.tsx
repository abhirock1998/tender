import "./App.css";
import HomePage from "./pages/Home/Page";
import AdminPage from "./pages/Admin/Page";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<AdminPage />} path="/admin" />
      <Route element={<HomePage />} path="*" />
    </Routes>
  );
}

export default App;
