import "./App.css";
import Dashboard from "./componenets/Dashboard";
import { HashRouter, Routes, Route } from "react-router-dom";
import User from "./componenets/user";
import Product from "./componenets/Product";
import Adduser from "./componenets/Adduser";
import { Navbar } from "./common/Navbar";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/User" element={<User />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Adduser" element={<Adduser />} />
          {/* <Route path="/Navbar" element={<Navbar />} /> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
