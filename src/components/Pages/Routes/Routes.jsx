import { Routes, Route } from "react-router-dom";

import Dashboard from "../Dashboard/Dashboard";
import Products from "../Dashboard/Products/Products";
import Create from "../Dashboard/Products/Create";
import Edit from "../Dashboard/Products/Edit";
import Show from "../Dashboard/Products/Show";
import Cart from "../Cart/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/cart" element={<Cart />} />

      <Route path="/products/:id" element={<Show />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<Create />} />
        <Route path="products/:id" element={<Show />} />
        <Route path="products/:id/edit" element={<Edit />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
