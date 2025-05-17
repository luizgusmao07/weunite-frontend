import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { VerifyResetCode } from "./pages/auth/VerifyResetCode";
import { Index } from "./pages/auth/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/auth/*"} element={<Index />} />
        <Route path={"/verify-email"} element={<VerifyEmail />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/verify-reset-code"} element={<VerifyResetCode />} />
      </Routes>
    </>
  );
}

export default App;
