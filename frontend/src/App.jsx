import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Collection from "./pages/Collection";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import Product from "./pages/Product";
import { ToastContainer, toast } from "react-toastify";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import UserProfileEdit from "./components/UserProfileEdit";
import ChangePassword from "./components/ChangePassword";
import ForgotPasswordOtp from "./pages/ForgotPasswordOtp";

function App() {
  return (
    <div className=" custom-padding">
      <Nav />
      <Searchbar />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/passwordchange" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPasswordOtp />} />
        <Route path="/profile/edit" element={<UserProfileEdit />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
