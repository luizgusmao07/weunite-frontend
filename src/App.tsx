import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import { ForgotPassword } from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/auth"} element={<Auth />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
