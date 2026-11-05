import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AppRoutes from "../Pages/Routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
      <ToastContainer position="top-left" autoClose={2000} rtl theme="light" />
    </BrowserRouter>
  );
};

export default App;
