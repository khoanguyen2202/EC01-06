import Dashboard from "./Page/Dashboard/index";
import Order from "./Page/Order/index";
import Product from "./Page/Product/index";
import Sale from "./Page/Sale/index";
import User from "./Page/User/index";
import Login from "./Page/Login/Login";

import { Routes, Route } from "react-router-dom";

function RouterPage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/order" element={<Order />} />
      <Route path="/product" element={<Product />} />
      <Route path="/sale" element={<Sale />} />
      <Route path="/user" element={<User />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default RouterPage;
