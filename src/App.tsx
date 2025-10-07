import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthRoutes } from "./routes/auth/AuthRoutes";
import { HomeRoutes } from "./routes/home/HomeRoutes";
import { ThemeProvider } from "./components/ThemeProvider";
import { ProfileRoutes } from "./routes/profile/ProfileRoutes";
import { OpportunityRoutes } from "./routes/opportunity/OpportunityRoutes";
import { ChatRoutes } from "./routes/chat/ChatRoutes";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/home/*" element={<HomeRoutes />} />
        <Route path="/profile/*" element={<ProfileRoutes />} />
        <Route path="/opportunity/*" element={<OpportunityRoutes />} />
        <Route path="/chat/*" element={<ChatRoutes />} />
        <Route path="/*" element={<Navigate to="/home" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
