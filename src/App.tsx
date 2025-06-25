import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoutes } from "./routes/auth/AuthRoutes";
import { HomeRoutes } from "./routes/home/HomeRoutes";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/home/*" element={<HomeRoutes />} />
        <Route path="/*" element={<HomeRoutes />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
