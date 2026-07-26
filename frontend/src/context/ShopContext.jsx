import { createContext, useContext, useEffect, useState } from "react";
// import products from "../assets/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { fetchProducts } from "../controllers/productController";
import { cartService } from "../controllers/cartController.js";

export const ShopContext = createContext(); // context create, Empty store

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCont, setCartCount] = useState(0);
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // navigate
  const navigate = useNavigate();
  // products from DB

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await cartService.getCart();

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cart.");
    }
  };

  // add to cart fuction
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Oops! Please select a size to continue.");
      return;
    }

    try {
      const response = await cartService.addToCart({
        productId: itemId,
        size,
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
        toast.success("Successfully added to your shopping cart!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart.");
    }
  };

  // cart count funtion
  const getCartCount = () => {
    let count = 0;

    for (let itemId in cartItems) {
      for (let size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }

    setCartCount(count);
  };

  // update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    try {
      const response = await cartService.updateCart({
        productId: itemId,
        size,
        quantity,
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart.");
    }
  };

  //getTotal amount
  const getTotalAmount = () => {
    let totalAmount = 0;

    for (let itemId in cartItems) {
      const product = products.find((p) => p._id == itemId);
      if (!product) continue;

      for (let size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];

        if (qty > 0) {
          totalAmount += product.newPrice * qty;
        }
      }
    }

    return totalAmount;
  };
  // Fetch products only once
  useEffect(() => {
    fetchProducts(setProducts);
    fetchCartData();
  }, []);

  // Update cart count whenever cart changes
  useEffect(() => {
    getCartCount();
  }, [cartItems]);

  const value = {
    currency,
    delivery_fee,
    products,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartCont,
    step,
    setStep,
    cartItems,
    getTotalAmount,
    navigate,
    token,
    setToken,
    updateQuantity,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
