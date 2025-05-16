import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/auth"} element={<AuthPage />} />
        <Route path={"/login"} element={<LoginPage />} /> 
      </Routes>
    </>
  );
}

export default App;
