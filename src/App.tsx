import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoutes } from "./routes/auth/AuthRoutes";
import { HomeRoutes } from "./routes/home/HomeRoutes";

function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/home/*" element={<HomeRoutes />} />
      <Route path="/*" element={<HomeRoutes />} />
    </Routes>
  );
}

export default App;
