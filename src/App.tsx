import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/auth"} element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
