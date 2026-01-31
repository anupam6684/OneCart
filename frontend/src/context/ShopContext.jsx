import { createContext, useContext, useEffect, useState } from "react";
import products from "../assets/data";
import { toast } from "react-toastify";

export const ShopContext = createContext(); // context create, Empty store

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCont, setCartCount] = useState(0);

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
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
