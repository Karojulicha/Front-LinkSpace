import { Routes, Route } from "react-router-dom";
import LinkViewer from "./pages/LinkViewer";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/page/:pageId" element={<LinkViewer />} />
      </Routes>
    </>
  );
}

export default App;
