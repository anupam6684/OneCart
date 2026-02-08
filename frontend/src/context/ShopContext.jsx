import { createContext, useContext, useEffect, useState } from "react";
import products from "../assets/data";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(); // context create, Empty store

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCont, setCartCount] = useState(0);
  const [step, setStep] = useState(1);
  // navigate
  const navigate = useNavigate();

  // add to cart fuction
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Oops! Please select a size to continue.");
      return;
    } else {
      const cartDataCopy = structuredClone(cartItems);
      if (!cartDataCopy[itemId]) {
        cartDataCopy[itemId] = {};
      }
      if (!cartDataCopy[itemId][size]) {
        cartDataCopy[itemId][size] = 1;
      } else {
        cartDataCopy[itemId][size] += 1;
      }
      setCartItems(cartDataCopy);
      toast.success("successfully added to your shopping cart!");
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
  const updateQuantity = (itemId, size, quantity) => {
    // // prevent invalid quantity
    // if (quantity < 1) return;

    const cart_data = structuredClone(cartItems);
    const product = products.find((p) => p._id == itemId); // ID match problem

    if (!product) return;

    // check stock
    if (quantity <= product.stock) {
      cart_data[itemId][size] = quantity;
      setCartItems(cart_data);
    } else {
      toast.error("Stock is not available");
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

  useEffect(() => {
    getCartCount();
    console.log(cartItems);
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

    updateQuantity,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
