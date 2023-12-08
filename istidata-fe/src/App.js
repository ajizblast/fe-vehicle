import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Detail from "./pages/Detail";
import Update from "./pages/Update";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Update />} />
      <Route path="/edit" element={<Update />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
