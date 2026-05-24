import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Products from "../pages/Products/Products";
import AddProduct from "../pages/AddProduct/AddProduct";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";
import Orders from "../pages/Orders/Orders";
import Categories from "../pages/Categories/Categories";
import Users from "../pages/Users/Users";
import Coupons from "../pages/Coupons/Coupons";
import Reports from "../pages/Reports/Reports";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import FAQs from "../pages/FAQs/FAQs";
import NotFound from "../pages/Notfound/NotFound";
import CreateCoupon from "../pages/Coupons/CreateCoupon";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Main Admin Base Frame */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} handle={{ title: "Dashboard" }} />

        {/* Route labels attached directly here */}

        <Route
          path="products"
          element={<Products />}
          handle={{ title: "Products" }}
        />
        <Route
          path="products/add"
          element={<AddProduct />}
          handle={{ title: "Add Product" }}
        />
        <Route
          path="products/:id/edit"
          element={<UpdateProduct />}
          handle={{ title: "Edit Product" }}
        />
        <Route
          path="orders"
          element={<Orders />}
          handle={{ title: "Orders" }}
        />
        <Route
          path="categories"
          element={<Categories />}
          handle={{ title: "Categories" }}
        />
        <Route path="users" element={<Users />} handle={{ title: "Users" }} />
        <Route
          path="coupons"
          element={<Coupons />}
          handle={{ title: "Coupons" }}
        />
        <Route
          path="coupon/new"
          element={<CreateCoupon />}
          handle={{ title: "Create Coupons" }}
        />
        <Route
          path="reports"
          element={<Reports />}
          handle={{ title: "Reports" }}
        />
        <Route
          path="profile"
          element={<Profile />}
          handle={{ title: "Profile" }}
        />
        <Route
          path="settings"
          element={<Settings />}
          handle={{ title: "Settings" }}
        />
        <Route path="FAQs" element={<FAQs />} handle={{ title: "Settings" }} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
